import {SignJWT} from 'jose'

import {ERR500} from '@/constants/responses'

import sqlserver from '@/helpers/odbc/sqlserver'

const SECRET = new TextEncoder().encode(process.env.SECRET_KEY)

async function buildViewUrl(route) {
	const token = await new SignJWT({filePath: route})
		.setProtectedHeader({alg: 'HS256'})
		.setExpirationTime('2h')
		.sign(SECRET)
	return `/api/file-manager/view/${token}`
}

const query = `
	SELECT id, invoice_no, [file], file_type, route, po_number,
	       invoice_date, misc, vendor, vendors_id, merge, hash
	FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
	WHERE invoice_no  = @invoice_no
	  AND vendors_id  = @vendors_id
	ORDER BY stamp DESC
`

export async function GET(req) {
	try {
		const {searchParams} = new URL(req.url)
		const invoice_no = searchParams.get('invoice_no')
		const vendors_id = searchParams.get('vendors_id')

		if (!invoice_no || !vendors_id) {
			return Response.json({files: []})
		}

		const result = await sqlserver(query, {invoice_no, vendors_id}, false)
		const rows = result?.recordset ?? []

		if (!rows.length) return Response.json({files: []})

		const files = await Promise.all(
			rows.map(async (row) => ({
				id: row.id,
				name: row.file,
				file: row.file,
				file_type: row.file_type,
				slotKey:
					row.file_type === 'invoice'
						? 'invoice'
						: row.file_type === 'packing_slip'
							? 'packing_slip'
							: 'other',
				route: row.route,
				po_number: row.po_number,
				invoice_date: row.invoice_date,
				vendor: row.vendor,
				vendors_id: row.vendors_id,
				merge: row.merge,
				hash: row.hash,
				isNew: false,
				viewUrl: await buildViewUrl(row.route),
			})),
		)

		const first = rows[0]
		const meta = {
			vendor: first.vendor,
			vendors_id: first.vendors_id,
			po_number: first.po_number,
			invoice_date: first.invoice_date,
			invoice_no: first.invoice_no,
		}

		return Response.json({files, meta})
	} catch (error) {
		console.error(error)
		return Response.json({files: [], error: true}, ERR500)
	}
}

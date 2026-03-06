// GET /api/file-manager/check-packslip?po_number=X&vendors_id=Y
import {ERR500} from '@/constants/responses'

import sqlserver from '@/helpers/odbc/sqlserver'

const query = `
	SELECT id, invoice_no, [file], file_type, route, po_number,
	       invoice_date, misc, vendor, vendors_id, [merge], hash
	FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
	WHERE po_number  = @po_number
	  AND vendors_id = @vendors_id
	ORDER BY stamp DESC
`

export async function GET(req) {
	try {
		const {searchParams} = new URL(req.url)
		const po_number = searchParams.get('po_number')
		const vendors_id = searchParams.get('vendors_id')

		if (!po_number || !vendors_id) return Response.json({files: []})

		const result = await sqlserver(query, {po_number, vendors_id}, false)
		const rows = result?.recordset ?? []

		if (!rows.length) return Response.json({files: []})

		const files = rows.map((row) => ({
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
			invoice_no: row.invoice_no,
			vendor: row.vendor,
			vendors_id: row.vendors_id,
			merge: row.merge,
			hash: row.hash,
			isNew: false,
			// hash ya es el JWT con filePath — se usa directo como viewUrl
			viewUrl: `/api/file-manager/view/${row.hash}`,
		}))

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

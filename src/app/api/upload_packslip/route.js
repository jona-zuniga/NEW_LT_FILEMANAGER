// GET /api/file-manager/check-packslip?po_number=X&vendors_id=Y
import {ERR500} from '@/constants/responses'

import sqlserver from '@/helpers/odbc/sqlserver'

// Trae todos los packslips del pono
const queryPackslips = `
	SELECT id, invoice_no, [file], file_type, route, po_number,
	       received_date, vendor, vendors_id, [merge], hash
	FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
	WHERE po_number  = @po_number
	  AND vendors_id = @vendors_id
	  AND file_type  = 'packing_slip'
	ORDER BY stamp DESC
`

// Si alguno tiene merge=1, trae TODOS los archivos del invoice_no + vendors_id
const queryMergedAll = `
	SELECT id, invoice_no, [file], file_type, route, po_number,
	       received_date, vendor, vendors_id, [merge], hash
	FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
	WHERE invoice_no = @invoice_no
	  AND vendors_id = @vendors_id
	ORDER BY stamp DESC
`

function mapRow(row) {
	return {
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
		received_date: row.received_date,
		invoice_no: row.invoice_no,
		vendor: row.vendor,
		vendors_id: row.vendors_id,
		merge: row.merge,
		hash: row.hash,
		isNew: false,
		viewUrl: `/api/file-manager/view/${row.hash}`,
	}
}

export async function GET(req) {
	try {
		const {searchParams} = new URL(req.url)
		const po_number = searchParams.get('po_number')
		const vendors_id = searchParams.get('vendors_id')

		if (!po_number || !vendors_id) return Response.json({files: []})

		// 1. Buscar packslips del pono
		const psResult = await sqlserver(queryPackslips, {po_number, vendors_id}, false)
		const psRows = psResult?.recordset ?? []

		if (!psRows.length) return Response.json({files: []})

		// 2. Si alguno tiene merge=1 → traer todos los archivos del invoice
		const hasMerge = psRows.some((r) => r.merge === 1)
		const invoice_no = psRows[0].invoice_no

		let allFiles = psRows.map(mapRow)

		if (hasMerge && invoice_no) {
			const mergedResult = await sqlserver(queryMergedAll, {invoice_no, vendors_id}, false)
			const mergedRows = mergedResult?.recordset ?? []
			// Deduplicar por id por si el packslip ya estaba en la primera query
			const seen = new Set(allFiles.map((f) => f.id))
			for (const row of mergedRows) {
				if (!seen.has(row.id)) {
					allFiles.push(mapRow(row))
					seen.add(row.id)
				}
			}
		}

		const first = psRows[0]
		const meta = {
			vendor: first.vendor,
			vendors_id: first.vendors_id,
			po_number: first.po_number,
			received_date: first.received_date,
			invoice_no: first.invoice_no,
			merged: hasMerge,
		}

		return Response.json({files: allFiles, meta})
	} catch (error) {
		console.error(error)
		return Response.json({files: [], error: true}, ERR500)
	}
}

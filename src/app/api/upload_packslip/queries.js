const sqlServer = {
	insertFileNames: `
		INSERT INTO [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		(invoice_no, [file], file_type, route, stamp, po_number,
		 [vendor], [vendors_id], [received_date], [merge], [hash])
		VALUES (
			@invoice_no,
			@file,
			@file_type,
			@route,
			@stamp,
			@po_number,
			@vendors,
			@vendors_id,
			@received_date,
			@merge,
			@hash
		)
	`,

	findPendingByPono: `
		SELECT id, route, [file], file_type, invoice_no, vendors_id
		FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		WHERE po_number  = @po_number
		  AND vendors_id = @vendors_id
		  AND file_type  IN ('invoice', 'other')
		  AND [merge]      = 0
	`,

	updateMergedRoute: `
		UPDATE [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		SET route = @route,
		    [merge] = 1
		WHERE id = @id
	`,
}

export const QueriesUpload = {sqlServer}

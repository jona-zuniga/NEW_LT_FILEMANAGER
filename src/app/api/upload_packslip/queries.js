const sqlServer = {
	insertFileNames: `
		DECLARE @out TABLE (id INT);

		INSERT INTO [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		(invoice_no, [file], file_type, route, stamp, po_number,
		 [vendor], [vendors_id], [received_date], [merge], [hash])
		OUTPUT INSERTED.id INTO @out (id)
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
			0,
			@hash
		);

		-- SELECT después del INSERT para leer el merge que el trigger actualizó
		SELECT id, [merge], invoice_no
		FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		WHERE id = (SELECT id FROM @out);
	`,

	getFilesToMoveAfterMerge: `
		SELECT id, route, file_type
		FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		WHERE invoice_no = @invoice_no
		  AND vendors_id = @vendors_id
		  AND file_type  IN ('invoice', 'other')
		  AND id         != @inserted_id
	`,

	updateRoute: `
		UPDATE [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		SET route = @route
		WHERE id = @id
	`,

	updatePackslipRoute: `
		UPDATE [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		SET route = @route,
		    hash  = @hash
		WHERE id = @id
	`,
}

export const QueriesUpload = {sqlServer}

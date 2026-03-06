const sqlServer = {

	checkDuplicate: `
		SELECT TOP 1 id, route, [file], hash
		FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		WHERE hash = @hash
	`,

	insertFileNames: `
		INSERT INTO [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
		(invoice_no, [file], file_type, route, stamp, po_number, [invoice_date], [misc],
		 [id_notify_to_user], [notify_to_user], [notes], [email_notify_to_user],
		 [job_title_notify_to_user], [vendor], [vendors_id], [merge], [hash])
		VALUES (
			@invoice_no,
			@file,
			@file_type,
			@route,
			@stamp,
			@po_number,
			@date,
			@misc,
			@id_notify_to_user,
			@notify_to_user,
			@notes,
			@email_notify_to_user,
			@job_title_notify_to_user,
			@vendors,
			@vendors_id,
			@merge,
			@hash
		)
	`,
}

export const QueriesUpload = {
	sqlServer,
}

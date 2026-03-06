// GET /api/file-manager/view/[hash]
// Soporta JWT con fileHash (nuevo) y filePath (legacy)

import sqlserver from '@/helpers/odbc/sqlserver'
import fs from 'fs'
import {jwtVerify} from 'jose'
import path from 'path'

function getMimeTypeFromExtension(ext) {
	const map = {
		'pdf':  'application/pdf',
		'jpg':  'image/jpeg',
		'jpeg': 'image/jpeg',
		'png':  'image/png',
		'webp': 'image/webp',
		'doc':  'application/msword',
		'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'xls':  'application/vnd.ms-excel',
		'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'txt':  'text/plain',
	}
	return map[ext?.toLowerCase()] || 'application/octet-stream'
}

const queryByHash = `
	SELECT TOP 1 route
	FROM [lt_accounting_filemanager].${process.env.MSSQL_SCHEMA}.[tbl_af_file_names]
	WHERE hash = @hash
`

export async function GET(req, {params}) {
	try {
		const {hash} = await params

		const {payload} = await jwtVerify(
			hash,
			new TextEncoder().encode(process.env.SECRET_KEY),
		)

		let filePath

		if (payload.fileHash) {
			// ── Nuevo — busca route en BD por hash ──
			const result = await sqlserver(queryByHash, {hash: payload.fileHash}, false)
			filePath     = result?.recordset?.[0]?.route

			if (!filePath) {
				return new Response('File not found', {status: 404})
			}
		} else if (payload.filePath) {
			// ── Legacy — ruta física directa en el JWT ──
			filePath = payload.filePath
		} else {
			return new Response('Invalid token', {status: 400})
		}

		if (!fs.existsSync(filePath)) {
			console.error('File missing on disk:', filePath)
			return new Response('File not found on disk', {status: 404})
		}

		const fileBuffer  = fs.readFileSync(filePath)
		const ext         = path.extname(filePath).slice(1)
		const contentType = getMimeTypeFromExtension(ext)

		return new Response(fileBuffer, {
			headers: {
				'Content-Type':        contentType,
				'Content-Disposition': `inline; filename="${path.basename(filePath)}"`,
			},
		})
	} catch (error) {
		console.error(error)
		return new Response('Error reading file', {status: 500})
	}
}

import {saveFile} from './helpers'
import {QueriesUpload} from './queries'
import moment from 'moment'

import {ERR500, OK200} from '@/constants/responses'

import sqlserver from '@/helpers/odbc/sqlserver'
import {getTokenPayload} from '@/helpers/utils/cookieHelpers'

function parseNullable(value) {
	if (
		value === 'undefined' ||
		value === 'null' ||
		value === undefined ||
		value === null ||
		value === ''
	) {
		return null
	}
	try {
		return JSON.parse(value)
	} catch {
		return value
	}
}

export async function POST(req) {
	try {
		const formData = await req.formData()
		const token = await getTokenPayload()
		const year = parseNullable(formData.get('item[year]'))
		const month = parseNullable(formData.get('item[month]'))
		const day = parseNullable(formData.get('item[day]'))

		const formattedDate = moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MM-DD-YYYY')

		const body = {
			notes: parseNullable(formData.get('item[notes]')),
			vendors: parseNullable(formData.get('item[vendors][VENDORNO]')),
			vendors_id: parseNullable(formData.get('item[vendors][ID]')),
			po_number: parseNullable(formData.get('item[pono][INFO]')),
			id_notify_to_user: parseNullable(formData.get('item[user][BADGE]')),
			notify_to_user: parseNullable(formData.get('item[user][EMPLOYEE]')),
			job_title_notify_to_user: parseNullable(formData.get('item[user][COMPANY]')),
			email_notify_to_user: parseNullable(formData.get('item[user][EMAIL]')),
			invoice_no: parseNullable(formData.get('item[invoice_no]')),
			misc: formData.get('item[misc]') === 'true',
			date: formattedDate,
			year,
			month,
			day,
		}

		const company = token?.COMPANY
		const location = token?.LOCATION

		const savedFiles = []

		for (const [key, value] of formData.entries()) {
			if (!key.endsWith('[file]')) continue
			if (!(value instanceof File)) continue

			const slotKey =
				parseNullable(formData.get(key.replace('[file]', '[slotKey]'))) ?? 'other'
			const fileType = slotKey

			const saveResult = await saveFile(value, {
				poNumber: body.po_number,
				company,
				location,
				vendors_id: body.vendors_id,
				username: token?.user,
				fileType,
				invoice_no: body.invoice_no,
				year: body.year,
				month: body.month,
				misc: body.misc,
				invoice_date: body.date,
				po_number: body.po_number,
			})

			if (!saveResult?.success) {
				throw new Error('Fallo al guardar archivo: ' + value.name)
			}

			savedFiles.push({
				...saveResult,
				originalName: value.name,
			})
		}

		for (const file of savedFiles) {
			await sqlserver(QueriesUpload.sqlServer.insertFileNames, {
				notes: body.notes,
				vendors: body.vendors,
				vendors_id: body.vendors_id,
				po_number: body.po_number,
				id_notify_to_user: body.id_notify_to_user,
				notify_to_user: body.notify_to_user,
				job_title_notify_to_user: body.job_title_notify_to_user,
				email_notify_to_user: body.email_notify_to_user,
				invoice_no: body.invoice_no,
				misc: body.misc,
				Date: body.date,
				file: file.filename,
				file_type: file.fileType,
				route: file.route,
				stamp: new Date(),
				merge: body?.misc ? 1 : 0,
				hash: file.hash,
			})
		}

		// // ───── NOTIFICACIÓN ─────
		// if (body.notify_to_user != null && savedFiles.length > 0) {
		//     await reviewEventNotificationByBadge({
		//         invoice_no: body.invoice_no,
		//         id_notify_to_user: body.id_notify_to_user,
		//         attachments: savedFiles.map(file => ({
		//             filename: file.filename,
		//             path: file.route
		//         }))
		//     })
		// }

		return Response.json('upload_success', OK200)
	} catch (error) {
		console.error(error)
		return Response.json('possible_error', ERR500)
	}
}

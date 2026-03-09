import {generateFileHash, saveFile} from './helpers'
import {QueriesUpload} from './queries'
import moment from 'moment'
import fs from 'node:fs'
import path from 'node:path'

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
	)
		return null
	try {
		return JSON.parse(value)
	} catch {
		return value
	}
}

function moveFile(oldPath, newPath) {
	const dir = path.dirname(newPath)
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true})
	fs.renameSync(oldPath, newPath)
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
			vendors: parseNullable(formData.get('item[vendors][VENDORNO]')),
			vendors_id: parseNullable(formData.get('item[vendors][ID]')),
			po_number: parseNullable(formData.get('item[pono][INFO]')),
			invoice_no: parseNullable(formData.get('item[invoice_no]')),
			received_date: formattedDate,
			year,
			month,
			day,
		}

		const company = token?.COMPANY
		const vendors = body.vendors_id

		for (const [key, value] of formData.entries()) {
			if (!key.endsWith('[file]')) continue
			if (!(value instanceof File)) {
				console.warn(`Skipping ${key}`)
				continue
			}

			const customName =
				parseNullable(formData.get(key.replace('[file]', '[customName]'))) ?? ''

			const saveResult = await saveFile(value, {
				company,
				vendors,
				year: body.year,
				invoice_no: body.invoice_no,
				po_number: body.po_number,
				customName,
			})

			if (!saveResult?.success) throw new Error(`Fallo al guardar: ${value.name}`)

			const insertResult = await sqlserver(
				QueriesUpload.sqlServer.insertFileNames,
				{
					vendors: body.vendors,
					vendors_id: body.vendors_id,
					po_number: body.po_number,
					invoice_no: body.invoice_no,
					received_date: body.received_date,
					file: saveResult.filename,
					file_type: 'packing_slip',
					route: saveResult.route,
					stamp: new Date(),
					hash: saveResult.hash,
				},
				false,
			)

			const inserted = insertResult?.recordset?.[0]
			const insertedId = inserted?.id
			const mergedByTrigger = inserted?.merge === 1
			const invoice_no = inserted?.invoice_no ?? body.invoice_no

			console.log('INSERT recordset:', JSON.stringify(insertResult?.recordset))
			console.log('inserted:', JSON.stringify(inserted))
			console.log('mergedByTrigger:', mergedByTrigger)
			console.log('insertedId:', insertedId)

			if (mergedByTrigger && invoice_no) {
				const finalFolder = path.join(
					process.env.FOLDER_PATH,
					String(company),
					String(year),
					String(vendors),
					String(month),
					String(invoice_no),
				)

				const newPackslipPath = path.join(finalFolder, path.basename(saveResult.route))
				try {
					moveFile(saveResult.route, newPackslipPath)
					const freshHash = await generateFileHash(newPackslipPath)
					await sqlserver(
						QueriesUpload.sqlServer.updatePackslipRoute,
						{
							id: insertedId,
							route: newPackslipPath,
							hash: freshHash,
						},
						false,
					)
				} catch (err) {
					console.error('Error moving packslip:', err)
				}

				const toMoveResult = await sqlserver(
					QueriesUpload.sqlServer.getFilesToMoveAfterMerge,
					{invoice_no, vendors_id: body.vendors_id, inserted_id: insertedId},
					false,
				)

				for (const pending of toMoveResult?.recordset ?? []) {
					const newPath = path.join(finalFolder, path.basename(pending.route))
					try {
						moveFile(pending.route, newPath)
						await sqlserver(
							QueriesUpload.sqlServer.updateRoute,
							{
								id: pending.id,
								route: newPath,
							},
							false,
						)
					} catch (err) {
						console.error(`Error moving ${path.basename(pending.route)}:`, err)
					}
				}
			}
		}

		return Response.json('upload_success', OK200)
	} catch (error) {
		console.error(error)
		return Response.json('possible_error', ERR500)
	}
}

'use server'

import {SignJWT} from 'jose'
import moment from 'moment'
import fs from 'node:fs'
import path from 'node:path'
import {PDFDocument} from 'pdf-lib'
import sharp from 'sharp'
import {v4 as uuidv4} from 'uuid'

function sanitizeInvoiceNo(str) {
	return String(str ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[\\/:*?"<>|]/g, '')
		.replace(/\s+/g, '')
		.replace(/[^a-zA-Z0-9-_]/g, '')
		.replace(/[.]+$/, '')
		.replace(/^(CON|PRN|AUX|NUL|COM\d|LPT\d)$/i, '_$1')
}

export async function generateFileHash(filePath) {
	return await new SignJWT({filePath})
		.setProtectedHeader({alg: 'HS256', typ: 'JWT'})
		.setExpirationTime('10m')
		.sign(new TextEncoder().encode(process.env.SECRET_KEY))
}

async function streamToBuffer(readableStream) {
	const chunks = []
	for await (const chunk of readableStream) chunks.push(chunk)
	return Buffer.concat(chunks)
}

function getExtensionFromMime(mime) {
	const map = {
		'application/pdf': '.pdf',
		'application/msword': '.doc',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
		'application/vnd.ms-excel': '.xls',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
		'text/plain': '.txt',
		'image/jpeg': '.jpg',
		'image/png': '.png',
		'image/webp': '.webp',
	}
	return map[mime] || ''
}

function buildFinalFileName({customName, originalName, invoice_no, po_number, uuid, extension}) {
	const timestamp = moment().format('YYYYMMDD')
	const safeRef = sanitizeInvoiceNo(invoice_no || po_number) || 'no-ref'
	const base = customName
		? customName
				.trim()
				.replace(/\s+/g, '_')
				.replace(/[^\w-]/g, '')
				.toLowerCase()
		: originalName.toLowerCase()
	return `${base}-${safeRef}-${timestamp}-${uuid}${extension}`
}

export const saveFile = async (
	file,
	{company = '', vendors = '', year = '', invoice_no = '', po_number = '', customName = ''},
) => {
	try {
		if (!file || !file.name) {
			return {success: false, error: 'Uploaded file has no name'}
		}

		const mimeType = file.type
		const originalExtension = path.extname(file.name) || getExtensionFromMime(mimeType)
		const originalName = file.name.replace(/\s+/g, '_').replace(originalExtension, '')
		const uuid = uuidv4()

		let buffer
		if (typeof file.arrayBuffer === 'function') {
			buffer = Buffer.from(await file.arrayBuffer())
		} else if (file.stream) {
			buffer = await streamToBuffer(file.stream)
		} else {
			throw new Error('Unsupported file object.')
		}

		const targetFolder = path.join(
			process.env.FOLDER_PATH,
			String(company),
			String(year),
			String(vendors),
			'_inbox',
			'packing_slip',
		)

		if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, {recursive: true})

		if (mimeType?.startsWith('image/')) {
			const finalFileName = buildFinalFileName({
				customName,
				originalName,
				invoice_no,
				po_number,
				uuid,
				extension: '.pdf',
			})
			const savePath = path.join(targetFolder, finalFileName)
			const imageBuffer = await sharp(buffer).resize({fit: 'contain'}).png().toBuffer()
			const doc = await PDFDocument.create()
			const img = await doc.embedPng(imageBuffer)
			const page = doc.addPage([img.width, img.height])
			page.drawImage(img, {x: 0, y: 0, width: img.width, height: img.height})
			const pdfBytes = await doc.save()
			fs.writeFileSync(savePath, pdfBytes)
			const hash = await generateFileHash(savePath)
			return {
				success: true,
				filename: finalFileName,
				fileType: 'packing_slip',
				route: savePath,
				hash,
			}
		}

		const finalFileName = buildFinalFileName({
			customName,
			originalName,
			invoice_no,
			po_number,
			uuid,
			extension: originalExtension,
		})
		const savePath = path.join(targetFolder, finalFileName)
		fs.writeFileSync(savePath, buffer)
		const hash = await generateFileHash(savePath)
		return {
			success: true,
			filename: finalFileName,
			fileType: 'packing_slip',
			route: savePath,
			hash,
		}
	} catch (error) {
		console.error('Error saving file:', error)
		return {success: false, error: error.message}
	}
}

import getStaticMarkup from './getStaticMarkup'
import puppeteer from 'puppeteer'

import {PDF_GENERATION_OPTIONS} from '@/constants/pdf'

/** @type {(Component: React.Component, pdfOptions?: import('puppeteer').PDFOptions) => Promise<Buffer>} */
export async function pdfGenerator(Component, pdfOptions) {
	const htmlString = await getStaticMarkup(Component)

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
	})
	const page = await browser.newPage()

	await page.emulateMediaType('screen')
	await page.setContent(htmlString, {
		waitUntil: 'networkidle0',
	})

	const pdfBuffer = await page.pdf({
		...PDF_GENERATION_OPTIONS,
		...pdfOptions,
	})

	browser.close()

	return pdfBuffer
}

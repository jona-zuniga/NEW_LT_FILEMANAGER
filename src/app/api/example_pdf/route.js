import {ExamplePdf, ExamplePdfHeader} from './_report/ExamplePdf'

import {ERR500} from '@/constants/responses'

import getStaticMarkup from '@/helpers/utils/getStaticMarkup'
import {pdfGenerator} from '@/helpers/utils/pdfGenerator'

export async function GET() {
	try {
		const pdfBuffer = await pdfGenerator(<ExamplePdf />, {
			headerTemplate: await getStaticMarkup(<ExamplePdfHeader />),
		})

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename=report.pdf',
			},
		})
	} catch (error) {
		console.error(error)

		return Response.json('error', ERR500)
	}
}

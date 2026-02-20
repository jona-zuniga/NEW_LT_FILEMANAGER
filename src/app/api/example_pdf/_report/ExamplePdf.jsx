import {readFileSync} from 'fs'
import {join} from 'path'

import {HTMLMain} from '@/constants/pdf'

const LtLogo = `data:image/png;base64,${readFileSync(
	join(process.cwd(), 'public', 'img', 'lt-logo-full.png'),
	{
		encoding: 'base64',
	},
)}`

export function ExamplePdfHeader() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'space-between',
				fontSize: '13px',
				width: '100%',
				backgroundColor: 'red',
				fontFamily: 'Segoe UI',
			}}>
			<img
				src={LtLogo}
				width={150}
				style={{
					marginTop: '10px',
					marginLeft: '40px',
				}}></img>

			<div style={{textAlign: 'right', marginRight: '40px'}}>
				<span style={{fontSize: '13px'}}>Example PDF</span>
			</div>
		</div>
	)
}

export function ExamplePdf() {
	return (
		<HTMLMain title={'Report'}>
			<h1 className="text-xl font-bold">Report</h1>
			<p className="text-sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas, ante et
				pharetra tincidunt, nisl nunc ultricies lectus, nec tincidunt nisi augue ut leo. Sed
				egestas, ante et pharetra tincidunt, nisl nunc ultricies lectus, nec tincidunt nisi
				augue ut leo.
			</p>
		</HTMLMain>
	)
}

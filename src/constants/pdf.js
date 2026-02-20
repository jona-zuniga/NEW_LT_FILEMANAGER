export const PDF_GENERATION_OPTIONS = {
	format: 'LETTER',
	printBackground: true,
	margin: {
		top: '100px',
		bottom: '40px',
		left: '40px',
		right: '40px',
	},
	displayHeaderFooter: true,
	headerTemplate: '<div/>',
	footerTemplate:
		'<div style="text-align: right;width: 297mm;font-size: 10px;"><span style="margin-right: 1cm"><span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
}

export function HTMLMain({children, title}) {
	return (
		<html lang="en">
			<head>
				<title>{title}</title>
				<script src="https://cdn.tailwindcss.com"></script>
			</head>
			<body>{children}</body>
		</html>
	)
}

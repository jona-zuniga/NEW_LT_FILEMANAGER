import './globals.css'
import Providers from './providers'

import {getTokenPayload} from '@/helpers/utils/cookieHelpers'

import language from '@/language.json'

export const metadata = {
	title: language.app_name.en,
	description: language.app_name.es,
}

export default async function RootLayout({children}) {
	let userData = null

	try {
		userData = await getTokenPayload()
	} catch (error) {
		userData = null
	}

	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				{process.env.NODE_ENV === 'development' && (
					<script
						crossOrigin="anonymous"
						src="//unpkg.com/react-scan/dist/auto.global.js"
					/>
				)}
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/img/lt-logo.png" />
			</head>
			<body className="m-0 h-screen w-screen p-0 dark:bg-slate-900">
				<Providers userData={userData}>{children}</Providers>
			</body>
		</html>
	)
}

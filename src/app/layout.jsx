import getAcl, { getAclByCookie } from '@/helpers/utils/getAcl'
import './globals.css'
import Providers from './providers'

import {getTokenPayload} from '@/helpers/utils/cookieHelpers'

import language from '@/language.json'
import { JSONViewer } from '@/components/utils/JSONViewer'

export const metadata = {
	title: language.app_name.en,
	description: language.app_name.es,
}

export default async function RootLayout({children}) {
	let userData = null
	let acl = null

	try {
		userData = await getTokenPayload()
		acl = await getAclByCookie()
		console.log('acl', acl)
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
				<Providers userData={userData} acl={acl}>{children}</Providers>
			</body>
		</html>
	)
}

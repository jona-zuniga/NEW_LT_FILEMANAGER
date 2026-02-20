import Providers from './providers'
import Link from 'next/link'

import {getFirstHref} from '@/components/navbar/getRoutes'
import SideBarLayout from '@/components/navbar/sidebar'
import {LtlogoFull} from '@/components/utils/LtLogo'

import {langs} from '@/constants/langs'

import {getTokenPayload} from '@/helpers/utils/cookieHelpers'
import {getAppVersion} from '@/helpers/utils/getCurrentGitInfo'

export default async function NotFound() {
	const version = await getAppVersion()

	let userData = null

	try {
		userData = await getTokenPayload()
	} catch (error) {
		userData = null
	}

	const routeKey = userData ? 'web' : 'public'
	const firstHrefRoute = getFirstHref(langs.en, routeKey) ?? '/en/login'

	return (
		<Providers userData={userData}>
			<SideBarLayout routesKey={routeKey} version={version}>
				<div className="flex h-full w-full flex-col items-center justify-center space-y-2">
					<LtlogoFull />
					<span className="text-2xl font-bold">404</span>
					<div className="text-center text-lg font-semibold">
						<h2>
							Page not found click
							<Link
								className="px-2 text-sky-600 no-underline hover:underline"
								href={firstHrefRoute}>
								here
							</Link>
							to go to the main page
						</h2>
					</div>
				</div>
			</SideBarLayout>
		</Providers>
	)
}

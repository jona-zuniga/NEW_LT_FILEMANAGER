import fs from 'fs'
import path from 'path'

import Icons from '@/components/utils/Icons'

/**
 * Get routes from directory app of Next.js
 * @returns list of routes
 */
export async function getRoutes() {
	const directoryPath = './src/app/[locale]/web'

	const files = fs.readdirSync(directoryPath)

	const routes = []

	for (const file of files) {
		const filePath = path.join(directoryPath, file)

		try {
			const stats = fs.statSync(filePath)

			if (stats.isDirectory()) {
				if (fs.readdirSync(filePath).includes('page.jsx')) {
					const data = await fs.promises.readFile(
						path.join(filePath, '/page.jsx'),
						'utf-8',
					)

					if (data.includes('export default function Page')) {
						const dynamicImportIcon = await import(
							`@/app/[locale]/web/${file}/icon.jsx`
						)
							.then((module) => module.default)
							.catch(() => <Icons.Misc.Home />)

						const dynamicImportAccess = await import(
							`@/app/[locale]/web/${file}/acl.js`
						)
							.then((module) => module.rolesAccess)
							.catch(() => [])

						routes.push({
							name: file
								.split('_')
								.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
								.join(' '),
							href: `/web/${file}`,
							nextRef: `/[locale]/web/${file}`,
							icon: dynamicImportIcon,
							access: dynamicImportAccess || [],
						})
					}
				}
			}
		} catch (err) {
			console.error(`Error checking ${filePath}:`, err)
		}
	}

	return routes
}

export function filterRoutesByRoles(routes, role) {
	return routes
		.filter((route) => route.access.includes(role))
		.map((route) => {
			delete route.access
			delete route.nextRef
			return route
		})
}

export function getCanAccessToRoute(routes, role, path, locale) {
	return routes.find((route) => {
		const href = route.nextRef.replace('[locale]', locale)

		return route.access.includes(role) && href === path
	})
}

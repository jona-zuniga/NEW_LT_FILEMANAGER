import {useUser} from '../providers/UserProvider'

import Icons from '@/components/utils/Icons'

const getPathWithLang = (path, lang) => `/${lang}${path}`

export const getRoutes = (lang, key, acl) => {
	if (key === 'web') {
		return [
			//acl?.['FileStorage'] &&
			{
				groupLabel: '',
				menus: [
					{
						href: getPathWithLang('/web', lang),
						label: 'home',
						icon: Icons.Misc.Home,
						submenus: [],
					},
				].filter(Boolean),
			},
			{
				groupLabel: 'uploads',
				icon: Icons.Misc.Home,
				menus: [
					{
						key: 'UploadInvoice',
						href: getPathWithLang('/web/upload_invoice', lang),
						icon: Icons.FileManager.LuReceiptText,
						label: 'upload_invoice',
					},
					{
						key: 'UploadPackslip',
						href: getPathWithLang('/web/upload_packslip', lang),
						icon: Icons.FileManager.LuPackage,
						label: 'upload_packslip',
					},
				].filter(Boolean),
			},
		].filter(Boolean)
	}

	if (key === 'public') {
		return []
	}

	return []
}

export const getFirstHref = (lang, key) => {
	const routes = getRoutes(lang, key)

	for (const route of routes) {
		if (route.href) return route.href
		if (route.menus) {
			for (const menu of route.menus) {
				if (menu.href) return menu.href
				if (menu.submenus) {
					for (const submenu of menu.submenus) {
						if (submenu.href) return submenu.href
					}
				}
			}
		}
	}
	return null
}

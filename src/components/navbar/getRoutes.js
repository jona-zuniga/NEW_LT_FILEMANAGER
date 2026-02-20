import Icons from '@/components/utils/Icons'

const getPathWithLang = (path, lang) => `/${lang}${path}`

export const getRoutes = (lang, key) => {
	if (key === 'web') {
		return [
			{
				groupLabel: '',
				menus: [
					{
						href: getPathWithLang('/web', lang),
						label: 'home',
						icon: Icons.Misc.Home,
						submenus: [],
					},
				],
			},
			{
				groupLabel: 'content',
				menus: [
					{
						href: '',
						label: 'examples',
						icon: Icons.Misc.User,
						submenus: [
							{
								href: getPathWithLang('/web/basic-components', lang),
								label: 'basic_components',
							},
							{
								href: getPathWithLang('/web/table', lang),
								label: 'table',
							},
							{
								href: getPathWithLang('/web/text-editor', lang),
								label: 'text_editor',
							},
						],
					},
					{
						href: getPathWithLang('/web/basic-components', lang),
						label: 'basic_components',
						icon: Icons.Misc.User,
					},
					{
						href: getPathWithLang('/web/mantine_data_table', lang),
						label: 'mantine_data_table',
						icon: Icons.Misc.User,
					},
					{
						href: getPathWithLang('/web/table', lang),
						label: 'table',
						icon: Icons.Misc.Clock,
					},
					{
						href: getPathWithLang('/web/text-editor', lang),
						label: 'text_editor',
						icon: Icons.Misc.Copy,
					},
					{
						href: getPathWithLang('/web/mantine_data_table', lang),
						label: 'mantine_data_table',
						icon: Icons.Misc.Copy,
					},
				],
			},
		]
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

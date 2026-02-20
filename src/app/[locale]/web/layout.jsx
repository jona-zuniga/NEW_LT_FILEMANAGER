import {MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import 'mantine-datatable/styles.layer.css'

import SideBarLayout from '@/components/navbar/sidebar'

import {getAppVersion} from '@/helpers/utils/getCurrentGitInfo'

export default async function AdminPanelLayout({children}) {
	const version = await getAppVersion()

	return (
		<MantineProvider>
			<SideBarLayout version={version} routesKey="web">
				{children}
			</SideBarLayout>
		</MantineProvider>
	)
}

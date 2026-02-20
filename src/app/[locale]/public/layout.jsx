
import SideBarLayout from '@/components/navbar/sidebar'
import {getAppVersion} from '@/helpers/utils/getCurrentGitInfo'

export default async function AdminPanelLayout({children}) {
	const version = await getAppVersion()

	return <SideBarLayout routesKey={'public'} version={version}>{children}</SideBarLayout>
}

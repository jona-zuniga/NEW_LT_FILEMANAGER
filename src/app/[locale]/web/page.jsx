import { PAGES } from '@/constants/roles'
import { getFormPermissions } from '@/helpers/utils/aclHelpers'
import { getToken } from '@/helpers/utils/cookieHelpers'
import getAcl from '@/helpers/utils/getAcl'
import MissingAccess from '../missing_access/page'
import Client from './client'

export default async function Page() {
	const token = await getToken()
	const { acl, hasAcl } = await getAcl(token.value, PAGES.Web)
	 if (!hasAcl) return <MissingAccess />

	// 	const role = acl['Accounting File Manager']?.group_name
	// const user = await getTokenPayload(token.value)
	// Obtener permisos de formularios desde ACL
	const formPermissions = getFormPermissions(acl, PAGES.Forms)

	return <Client />
}

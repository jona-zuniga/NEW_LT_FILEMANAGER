import {getToken} from '@/helpers/utils/cookieHelpers'
import getAcl from '@/helpers/utils/getAcl'

export async function POST() {
	try {
		const token = await getToken()
		const data = await getAcl(token.value)

		let {hasAcl, acl} = data ?? {}

		acl = acl?.['Accounting File Manager'] ?? null

		let group = {id: acl?.group_id ?? null, name: acl?.group_name ?? null}

		return Response.json({hasAcl, tokenData: token, acl: acl ?? null, group: group})
	} catch (err) {
		console.error('ACL error:', err)
		return Response.json({error: true, message: err.message}, {status: 500})
	}
}

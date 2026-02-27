import {getToken} from './cookieHelpers'
import axios from 'axios'

export default async function getAcl(token, page = null) {
	const {data} = await axios.post(process.env.ACL_MICROSERVICE_URL, {
		token,
		page,
		application_id: Number(process.env.APPLICATION_ID),
	})
	return data
}

export async function getAclByCookie() {
		const token = await getToken()
		const { acl, hasAcl } = await getAcl(token.value)

	return acl
}

"use server"
import sqlserver from "../odbc/sqlserver"
import { getTokenPayload } from "../utils/cookieHelpers"
const queries = {
	sqlServer: {
		get: `
            select * from loadtrail.dbo.F_GETACL(@badge, @plant, @page, @application_id)
        `,
	},
}

export async function getAclInitial({ badge = null, plant = null }) {
	try {
		const data = await sqlserver(queries.sqlServer.get, {
			badge,
			plant,
			page: null,
			application_id: 25,
		})

		let { hasAcl, acl: aclRes } = data?.[0] ?? {}

		let acl = JSON.parse(aclRes)

		acl = acl?.['Accounting File Manager'] ?? null
		let group = { id: acl?.group_id ?? null, name: acl?.group_name ?? null }

		return { hasAcl,  acl: acl ?? null, group: group }

	} catch (error) {
		console.error(error)
		return {}
	}
}


export default async function getAcl({ page = null, application_id = 25 } = {}) {
	try {
		const token = await getTokenPayload()

		const data = await sqlserver(queries.sqlServer.get, {
			badge: token?.user,
			plant: token?.plant,
			page,
			application_id,
		})

		let { hasAcl, acl: aclRes } = data?.[0] ?? {}

		let acl = JSON.parse(aclRes)

		acl = acl?.['Accounting File Manager'] ?? null

		let group = { id: acl?.group_id ?? null, name: acl?.group_name ?? null }


		if (page) acl = acl?.pages?.[page]

		return { hasAcl, tokenData: token, acl: acl ?? null, group: group }
	} catch (error) {
		console.error(error)
		return {}
	}
}
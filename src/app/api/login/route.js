import { ERR400, ERR401, ERR500, OK200 } from '@/constants/responses'
import getAcl from '@/helpers/utils/getAcl'
import axios from 'axios'
import { z } from 'zod'

const userSchema = z.object({
	user: z
		.number()
		.or(z.string())
		.transform((val) => val.toString()),
	pass: z
		.number()
		.or(z.string())
		.transform((val) => val.toString()),
})

export async function POST(req) {
	const data = await req.json()
	const { user, pass } = userSchema.parse(data)

	try {
		const { data: { token } } = await axios.post(process.env.AUTH_MICROSERVICE_URL, { badge: user, password: pass });
		 
		const { acl, hasAcl } = await getAcl(token)
		if (!hasAcl) return Response.json('unauthorized', { ...ERR401 })

		const maxAge = 60 * 60 * 24 * 365 * 10;
		return Response.json('login_success', {
			...OK200,
			hasAcl,
			headers: {
				'Set-Cookie': `AuthToken${process.env.APP_PORT}=${token}; Path=/; HttpOnly; Max-Age=${maxAge};`,
			},
		})

	} catch (error) {
		if (error.response?.status == 401) return Response.json('unauthorized', { ...ERR401 })
		console.error(error)
		if (error instanceof z.ZodError) return Response.json('invalid_params', ERR400)
		return Response.json('error', ERR500)
	}
}

export async function DELETE() {
	try {
		return Response.json('logout_success', {
			...OK200,
			headers: {
				'Set-Cookie': `AuthToken${process.env.APP_PORT}=; Path=/; HttpOnly;`,
			},
		})
	} catch (error) {
		console.error(error)
		if (error instanceof z.ZodError) return Response.json('invalid_params', ERR400)
		return Response.json('error', ERR500)
	}
}

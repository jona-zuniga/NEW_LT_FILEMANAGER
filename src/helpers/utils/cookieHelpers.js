'use server'

import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

/**
 * Get token from token string
 * @param {*} token
 * @returns
 */
export const getFromToken = async (token) => {
	const payload = await verify(token, process.env.SECRET_KEY)
	return payload
}

/**
 * Get token from cookie
 * @returns
 */
export const getToken = async () => {
	const cookieStore = await cookies()
	const token = cookieStore.get(`AuthToken${process.env.APP_PORT}`)
	return token
}

/**
 * Get token payload from cookie if token is valid return payload else return null
 * @returns
 */
export const getTokenPayload = async () => {
	const token = await getToken()

	if (!token) return null

	try {
		const payload = await getFromToken(token.value)
		return payload
	} catch (error) {
		return null
	}
}

import {SignJWT, jwtVerify} from 'jose'

export async function verify(token, secret) {
	try {
		const {payload} = await jwtVerify(token, new TextEncoder().encode(secret))
		return payload
	} catch (error) {
		return {
			JWTerror: error,
		}
	}
}

export async function sign(payload, secret) {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + 60 * 60 * 24 // one hour

	return new SignJWT({...payload})
		.setProtectedHeader({alg: 'HS256', typ: 'JWT'})
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(secret))
}

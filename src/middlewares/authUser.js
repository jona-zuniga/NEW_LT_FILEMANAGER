import { NextResponse } from 'next/server'

import { langs } from '@/constants/langs'
import { ERR401 } from '@/constants/responses'

import { verify } from '@/helpers/utils/jwt'

export const authUser = (next) => {
	return async (request, _next) => {
		const pathname = request.nextUrl.pathname

		const token = request.cookies.get(`AuthToken${process.env.APP_PORT}`)?.value
		const payload = await verify(token, process.env.SECRET_KEY)

		if (!pathname.startsWith('/_next')) {
			const excludedApiList = ['/api/login', '/api/public', '/img']
			const excludedWebList = ['/public', '/login']

			if (excludedApiList.some((path) => pathname.startsWith(path)))
				return next(request, _next)

			if (pathname == '/') return NextResponse.redirect(new URL(`/en/web`, request.url))
			if (pathname.startsWith('/api/login')) return next(request, _next)

			if (
				Object.values(langs).some((lang) =>
					excludedWebList.some((path) => pathname.startsWith(`/${lang}${path}`)),
				)
			) {
				return next(request, _next)
			}

			if (payload.JWTerror) {
				if (pathname.startsWith('/api')) {
					return NextResponse.json('unauthorized', ERR401)
				}

				const locale = pathname.split('/')?.[1]

				if (!Object.values(langs).includes(locale)) {
					return NextResponse.redirect(new URL(`/en/login`, request.url))
				}

				return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
			}
		}
		return next(request, _next)
	}
}

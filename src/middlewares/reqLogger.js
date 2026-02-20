import moment from 'moment'

export const reqLogger = (next) => {
	return async (request, _next) => {
		if (!request.url.includes('/_next'))
			console.info(
				`${moment().format('HH:MM:ss')} > Received request: ${request.method} ${request.url}`,
			)

		return await next(request, _next)
	}
}

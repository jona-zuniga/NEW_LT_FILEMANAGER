/**
 * Get search params object from NextRequest
 * @param {*} req
 * @returns
 */
export function getSearchParams(req) {
	const searchParams = req.nextUrl.searchParams
	const params = Object.fromEntries(searchParams.entries())
	return params
}

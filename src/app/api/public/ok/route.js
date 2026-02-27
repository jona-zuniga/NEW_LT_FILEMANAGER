import { ERR500, OK200 } from "@/constants/responses"

/**
 * @param {*} req NextRequest object
 * @param {*} params contains the dynamic route parameters
 * @returns 
 */
 
export async function GET(req, {params}) {
	try {
		return Response.json("ok", 
			OK200,
		)
	} catch (error) {
		return Response.json(error.message, ERR500)
	}
}
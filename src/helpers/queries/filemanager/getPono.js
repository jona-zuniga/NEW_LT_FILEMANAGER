'use server'

import oracle from "@/helpers/odbc/oracle"


const query = `
SELECT id, pono AS INFO
FROM iqms.PO
`

export default async function getPono() {
	try {
		const res = await oracle(query)
		//console.log('Respuesta Oracle:', res)
		return res
	} catch (error) {
		console.error(error)
		return []
	}
}

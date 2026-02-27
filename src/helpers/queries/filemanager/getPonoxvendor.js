'use server'

import oracle from "@/helpers/odbc/oracle"


const query = `
SELECT id, pono AS INFO
FROM iqms.PO WHERE VENDOR_ID = :vendorid
`

export default async function getPonoxVendor(vendorid) {
	console.log('getPonoxVendor', vendorid)
	if (!vendorid) return []


	try {
		console.log('vendorid', vendorid)
		const res = await oracle(query, [vendorid])
		console.log('Respuesta Oracle:', res)
		return res
	} catch (error) {
		console.error(error)
		return []
	}
}
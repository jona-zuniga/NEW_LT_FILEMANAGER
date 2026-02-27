'use server'

import oracle from "@/helpers/odbc/oracle"


const query = `
   SELECT c.* FROM (
	SELECT b.ID, b.VENDORNO, b.COMPANY, b.ATTN, b.ADDR1, b.ADDR2, b.CITY, b.STATE,
	b.COUNTRY, b.ZIP, b.PHONE_NUMBER R, b.E_MAIL_ADDR, b.TERMS_ID,
	b.INCLUDE_IN_1099, b.A1099_CODE,b.NAME_1099, b.AP_GLACCT_ID,
	'('|| b.VENDORNO || ') ' || b.COMPANY ||', '|| COALESCE(b.ADDR1,'') ||' '||
	COALESCE(b.ADDR2,'') ||' '|| COALESCE(b.ZIP,'') || ', ' ||
	COALESCE(b.CITY,'') || ' ' || COALESCE(b.STATE,'') ||' '||
	COALESCE(b.COUNTRY,'') ||' '|| COALESCE(b.PHONE_NUMBER,'') DISPLAY_NAME
	FROM (
		SELECT a.ID, a.VENDORNO, a.COMPANY, a.ATTN, a.ADDR1, a.ADDR2, a.CITY, a.STATE,
		INITCAP(a.COUNTRY) COUNTRY, a.ZIP,
		CASE WHEN a.PHONE_NUMBER = '--' THEN NULL ELSE a.PHONE_NUMBER END PHONE_NUMBER,
		a.E_MAIL_ADDR, a.TERMS_ID, a.INCLUDE_IN_1099, a.A1099_CODE, a.NAME_1099, a.AP_GLACCT_ID
		FROM (
			SELECT ID, VENDORNO, COMPANY, ATTN, ADDR1 , ADDR2 , INITCAP(CITY) CITY, STATE,
			CASE WHEN COUNTRY LIKE 'UNITED STATES OF AMERICA' THEN 'USA' ELSE COUNTRY END COUNTRY,
			ZIP,
			SUBSTR(REGEXP_REPLACE(PHONE_NUMBER, '[^0-9]', ''), 1, 3) || '-' ||
			SUBSTR(REGEXP_REPLACE(PHONE_NUMBER, '[^0-9]', ''), 4, 3) || '-' ||
			SUBSTR(REGEXP_REPLACE(PHONE_NUMBER, '[^0-9]', ''), 7, 4) AS PHONE_NUMBER,
			E_MAIL_ADDR, TERMS_ID, INCLUDE_IN_1099, A1099_CODE ,NAME_1099, AP_GLACCT_ID
			FROM IQMS.VENDOR
			WHERE PK_HIDE <> 'Y'
		)a
	)b
)c
`

export default async function getVendors() {
	try {
		const res = await oracle(query)
       //console.log('Respuesta Oracle:', res)
		return res
	} catch (error) {
		console.error(error)
		return []
	}
}

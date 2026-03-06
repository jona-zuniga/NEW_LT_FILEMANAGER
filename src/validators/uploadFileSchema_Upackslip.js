import {z} from 'zod'

const packslipItemSchema = z.object({
	vendors: z.object({ID: z.number(), VENDORNO: z.string()}).nullable(),
	pono: z.object({ID: z.number(), INFO: z.string()}).nullable(),
	invoice_no: z.string().min(1, 'Invoice number is required').max(50, 'Too long'),
	day: z.string().min(1, 'Day is required'),
	month: z.string().min(1, 'Month is required'),
	year: z.string().min(1, 'Year is required'),
})

export function validatePackslip(item, files) {
	const fieldErrors = {}

	if (!files || files.length === 0) {
		fieldErrors.files = ['At least one pack slip file is required']
	}

	const result = packslipItemSchema.safeParse(item)
	if (!result.success) {
		for (const issue of result.error.issues) {
			const field = String(issue.path[0])
			if (!fieldErrors[field]) fieldErrors[field] = []
			fieldErrors[field].push(issue.message)
		}
	}

	if (!item?.vendors) {
		if (!fieldErrors.vendors) fieldErrors.vendors = []
		fieldErrors.vendors.push('Vendor is required')
	}

	const isValid = Object.keys(fieldErrors).length === 0

	return {isValid, errors: fieldErrors, data: isValid ? result.data : null}
}

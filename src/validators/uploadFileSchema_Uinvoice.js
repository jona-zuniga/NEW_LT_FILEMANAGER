// validators/uploadFileSchema_Uinvoice.js
import {z} from 'zod'

// ─────────────────────────────────────────────────────────────
// Estos schemas reflejan EXACTAMENTE los objetos del Zustand
// INITIAL_ITEM: { vendors, invoice_no, day, month, year,
//                 pono, misc, notes, user }
// ─────────────────────────────────────────────────────────────

const vendorSchema = z.object({
	ID:       z.number(),
	VENDORNO: z.string(),
	COMPANY:  z.string().optional(),
	CITY:     z.string().optional(),
})

const ponoSchema = z.object({
	ID:   z.number(),
	INFO: z.string(),
})

// userSchema ahora sí se usa — coincide con item.user del state
const userSchema = z.object({
	BADGE:    z.union([z.string(), z.number()]),
	EMPLOYEE: z.string().optional(),
	EMAIL:    z.string().optional(),
})

// ─────────────────────────────────────────────────────────────
// Schema del item — igual a INITIAL_ITEM del Zustand
// ─────────────────────────────────────────────────────────────
export const invoiceItemSchema = z
	.object({
		vendors:    vendorSchema.nullable().refine((val) => val !== null, {message: 'Vendor is required'}),
		invoice_no: z.string().min(1, 'Invoice number is required').max(50, 'Too long'),
		day:        z.string().min(1, 'Day is required'),
		month:      z.string().min(1, 'Month is required'),
		year:       z.string().min(1, 'Year is required'),
		pono:       ponoSchema.nullable().optional(),
		misc:       z.boolean().optional().default(false),
		notes:      z.string().optional(),
		user:       userSchema.nullable().optional(), // ← campo user como objeto
	})
	// Si misc = true → notes obligatorio
	.refine((data) => !data.misc || (!!data.notes && data.notes.trim().length > 0), {
		message: 'Notes are required when Misc is active',
		path:    ['notes'],
	})
	// Si misc = true → user obligatorio (lee user.BADGE)
	.refine((data) => !data.misc || !!data.user?.BADGE, {
		message: 'User to notify is required when Misc is active',
		path:    ['user'],
	})
	// Si misc = false → pono obligatorio
	.refine((data) => data.misc || !!data.pono?.ID, {
		message: 'PO Number is required',
		path:    ['pono'],
	})

// ─────────────────────────────────────────────────────────────
// Schema de archivo — igual a la estructura de addFilesToSlot
// ─────────────────────────────────────────────────────────────
export const uploadedFileSchema = z.object({
	id:         z.string().uuid(),
	name:       z.string().min(1),
	customName: z.string().min(1),
	size:       z.number().positive(),
	slotKey:    z.enum(['invoice', 'other']),
	isNew:      z.boolean(),
	img:        z.string().optional(),
})

// ─────────────────────────────────────────────────────────────
// Schema completo para el submit
// ─────────────────────────────────────────────────────────────
export const invoiceSubmitSchema = z.object({
	item: invoiceItemSchema,
	files: z
		.array(uploadedFileSchema)
		.min(1, 'At least one file is required')
		.refine(
			(files) => files.filter((f) => f.slotKey === 'invoice').length === 1,
			{message: 'Exactly one invoice file is required'},
		),
})

// ─────────────────────────────────────────────────────────────
// Helper — recibe item y files desde handleSave
// ─────────────────────────────────────────────────────────────
export function validateInvoice(item, files) {
	const result = invoiceSubmitSchema.safeParse({item, files})

	if (result.success) {
		return {isValid: true, errors: {}, data: result.data}
	}

	// Aplana errores bajando al nivel de item
	// issue.path = ['item', 'invoice_no'] → fieldErrors.invoice_no
	// issue.path = ['item', 'user']       → fieldErrors.user
	// issue.path = ['files']              → fieldErrors.files
	const fieldErrors = {}

	for (const issue of result.error.issues) {
		const path = issue.path

		if (path[0] === 'item' && path[1]) {
			const field = String(path[1])
			if (!fieldErrors[field]) fieldErrors[field] = []
			fieldErrors[field].push(issue.message)
		} else if (path[0] === 'item') {
			if (!fieldErrors.item) fieldErrors.item = []
			fieldErrors.item.push(issue.message)
		} else if (path[0] === 'files') {
			if (!fieldErrors.files) fieldErrors.files = []
			fieldErrors.files.push(issue.message)
		}
	}

	return {
		isValid: false,
		errors:  fieldErrors,
		// resultado: { invoice_no: ['msg'], user: ['msg'], pono: ['msg'], ... }
	}
}
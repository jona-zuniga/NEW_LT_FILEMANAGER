import moment from 'moment'
import {z} from 'zod'

import {notifyLoaded} from '@/components/utils/Notifications'

import {ERRSUBMIT} from '@/constants/responses'

// Validator

//* Conver value to null or keep if value is not falsy
export const ztransNull = (schema) =>
	z.preprocess((val) => ((val === '' || !val) && val != 0 ? null : val), schema.or(z.null()))
//* Trim string value before validate
export const ztransTrim = (schema) =>
	z.preprocess((arg) => (typeof arg === 'string' ? arg.trim() : arg), schema)

//* Validate date
export const zDate = () => z.preprocess((val) => moment(val).toDate(), z.date().or(z.null()))

/**
 * Notify Zod errors using list of ZodErr
 * @param {*} ZodErr
 */
export const notifyZodErrors = (ZodErr) => {
	console.error(ZodErr.errors)

	ZodErr.errors.map((e) => {
		notifyLoaded(null, ERRSUBMIT.status, e.message)
	})
}

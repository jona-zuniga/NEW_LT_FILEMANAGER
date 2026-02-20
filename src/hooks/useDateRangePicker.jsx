import {useState} from 'react'

/**
 * Hook for make date range picker use more simple
 * @param {*} opts
 * @returns
 */
export function useDateRangePicker(
	opts = {
		from: null,
		to: null,
	},
) {
	const {from, to} = opts
	const fromDate = from ? new Date(from) : null
	const toDate = to ? new Date(to) : null
	const [date, setDate] = useState(!from || !to ? null : {from: fromDate, to: toDate})

	return {
		date,
		setDate,
		clear: () => setDate(null),
		reset: () => setDate({from: fromDate, to: toDate}),
	}
}

export function useDateRangePickerSingle(dateDefault) {
	const dateDate = dateDefault ? new Date(dateDefault) : null
	const [date, setDate] = useState(dateDate)

	return {
		date,
		setDate,
		clear: () => setDate(null),
		reset: () => setDate(dateDate),
	}
}

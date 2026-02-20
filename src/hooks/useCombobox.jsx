import {useState} from 'react'
/**
 * Hook for make combobox use more simple
 * @param {*} val 
 * @returns 
 */
export function useCombobox(val = null) {
	const [value, setValue] = useState(val)

	return {
		value,
		setValue,
		clear: () => setValue(null),
		reset: () => setValue(val),
	}
}

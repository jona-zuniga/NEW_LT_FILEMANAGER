import {useState} from 'react'

/**
 * Hook for make dropdown use more simple
 * @returns 
 */
export default function useDropdown() {
	const [show, setShow] = useState(false)

	const toggle = () => {
		setShow(!show)
	}

	return {
		show,
		toggle,
	}
}

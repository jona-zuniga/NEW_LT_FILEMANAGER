import {useState} from 'react'

/**
 * Hook for make dialog use more simple
 * @param {*} isOpen
 * @returns 
 */
export function useDialog(isOpen) {
	const [show, setShow] = useState(isOpen)

	const toggle = () => {
		setShow(!show)
	}

	const on = () => {
		setShow(true)
	}

	const off = () => {
		setShow(false)
	}

	return {
		show,
		setShow,
		toggle,
		on,
		off,
	}
}

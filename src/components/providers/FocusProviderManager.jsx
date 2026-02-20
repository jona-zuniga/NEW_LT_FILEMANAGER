import React from 'react'

const FocusContext = React.createContext({
	setFocus: () => {},
	registerFocusElem: () => {},
	unregisterFocusElem: () => {},
	isExistFocus: () => {},
})

/**
 * Provider tath manages focus in elements use references
 * @param {*} children
 * @returns
 */
export function FocusManager({children}) {
	const refs = React.useRef(new Map())
	/**
	 * Notes: the keys used in all functions should be are registred
	 * in cosntant FOCUS_ID located in file src/constants/focus.js
	 */

	/**
	 * Check if focus element is register in manager
	 * @param {*} key
	 * @returns
	 */
	const isExistFocus = (key) => {
		return refs.current.has(key)
	}

	/**
	 * Set focus on element
	 * @param {*} key 
	 * @returns 
	 */
	const setFocus = (key) => {
		const ref = refs.current.get(key)

		if (!ref || !ref.current) {
			return null
		}

		ref.current.focus()
		return ref
	}

	/**
	 * Register focus element
	 * @param {*} key
	 * @param {*} focusOptions
	 * @param {*} focusOptions.overRide Indicate if element should be override if key is register ohter time
	 * @param {*} focusOptions.focusOnRegister Indicate if element should be focused on register
	 * @returns
	 */
	const registerFocusElem = (key, focusOptions) => {
		return (ref) => {
			if (refs.current.has(key) & !focusOptions?.overRide) {
				return
			}

			refs.current.set(key, {current: ref})

			if (focusOptions?.focusOnRegister) {
				ref.focus()
			}
		}
	}

	/**
	 * Unregister focus element
	 * @param {*} key 
	 */
	const unregisterFocusElem = (key) => {
		refs.current.delete(key)
	}

	return (
		<FocusContext.Provider
			value={{setFocus, registerFocusElem, unregisterFocusElem, isExistFocus}}>
			{children}
		</FocusContext.Provider>
	)
}

/**
 * Get focus context
 * @returns 
 */
export function useFocusContext() {
	const context = React.useContext(FocusContext)
	if (context === undefined) {
		throw new Error('useFocusContext must be used within a FocusManagerProvider')
	}

	return context
}

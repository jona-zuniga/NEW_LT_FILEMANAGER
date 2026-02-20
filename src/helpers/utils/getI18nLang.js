import {langs} from '@/constants/langs'

import locales from '@/language'

/**
 * Get i18n messages using current lang
 * @param {*} lang use constants in constants/langs.js
 * @returns
 */
export default function getI18nLang(langParam) {
	const lang = langParam ?? langs.en

	const procLocales = Object.entries(locales).reduce((acc, [key, value]) => {
		acc[key] = value[lang] ?? `::!${key}!::`
		// !value[lang] && console.warn(`Translation lang "${lang}" for key "${key}" not found`)
		return acc
	}, {})

	return procLocales
}

/**
 * Translator function for i18n
 * @param {*} messages
 * @returns
 */
export const translator = (messages) => {
	return (key) => {
		const message = messages[key]
		if (!message) {
			// console.warn(`Translation for key "${key}" not found`)
			return `::!${key}!::`
		}
		return message
	}
}

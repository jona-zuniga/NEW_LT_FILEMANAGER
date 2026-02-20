import {usePathname, useRouter} from 'next/navigation'
import {createContext, useContext} from 'react'

import {langs} from '@/constants/langs'

import {translator} from '@/helpers/utils/getI18nLang'

const i18nContext = createContext({
	t: (key) => key,
	lang: langs.en,
	// eslint-disable-next-line no-unused-vars
	changeLang: (lang) => undefined,
})

/**
 * Get i18n context
 * @returns
 */
const useI18n = () => useContext(i18nContext)

/**
 * Get t function
 * @returns
 */
export const useT = () => useI18n().t

/**
 * Get lang and changeLang function
 * @returns
 */
export const useLang = () => {
	const {lang, changeLang} = useI18n()

	return {lang, changeLang}
}

/**
 * Consumer for i18n context
 * @returns
 */
export const i18nConsumer = i18nContext.Consumer

/**
 * Provider for i18n context
 * @param {*} messages list of messages by lang
 * @param {*} lang current lang
 * @returns
 */
export const I18nProvider = ({children, messages, lang}) => {
	const path = usePathname()
	const router = useRouter()

	// Translate function
	const t = translator(messages)

	/**
	 * Change lang
	 * @param {*} newLang one of registered on constants/langs.js
	 * @returns
	 */
	const changeLang = (newLang) => {
		if (newLang === lang || !lang || !newLang) return

		const newPath = path.replace(lang, newLang)

		router.push(newPath, {scroll: false})
	}

	return (
		<i18nContext.Provider value={{lang: lang ?? langs.en, changeLang, t}}>
			{children}
		</i18nContext.Provider>
	)
}

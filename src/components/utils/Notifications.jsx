import {toast as sonner} from 'sonner'

import {langs} from '@/constants/langs'
import {
	ERR400,
	ERR401,
	ERR403,
	ERR404,
	ERR405,
	ERR409,
	ERR410,
	ERR500,
	ERRNET,
	ERRSUBMIT,
	OK200,
	OK207,
} from '@/constants/responses'

import getI18nLang, {translator} from '@/helpers/utils/getI18nLang'

/**
 * Global notify for hot taost
 * @param { HotToastID } id for control a existing toast instance with the new definition
 * @param { Number } code the code is used fro define toast type
 * @param { String } msg message to show
 * @returns { HotToastID } id for control a existing toast instance with the new definition
 */

export const notifyLoaded = (id, code, msg) => {
	const pathName = window.location.pathname
	const locale = pathName.split('/')[1] ?? langs.en
	const messages = getI18nLang(locale)
	const t = translator(messages)

	switch (code) {
		case OK200.status:
			return sonner.success(t(msg), {id})

		case ERR500.status:
		case ERR404.status:
		case ERR405.status:
			return sonner.error(t(msg), {id})

		case OK207.status:
		case ERR409.status:
		case ERR410.status:
			return sonner.info(t(msg), {id})

		case ERR400.status:
		case ERR401.status:
		case ERR403.status:
		case ERRSUBMIT.status:
		case ERRNET.status:
			return sonner.warning(t(msg), {id})

		default:
			return sonner.loading(t(msg), {id})
	}
}

export const initLoading = () => notifyLoaded(null, null, 'loading')

/**
 * Destroy a toast instance from id return by notifyLoaded
 * @param {*} id
 * @returns
 */

export const notifyDismiss = (id) => {
	return sonner.dismiss(id)
}

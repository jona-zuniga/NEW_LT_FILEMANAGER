import {notifyLoaded} from '@/components/utils/Notifications'

import {commonCatch, commonThen} from '@/helpers/utils/axios'

import {del, post} from '@/lib/axios'

const BASE_ROUTE = '/login'

export const __login = {
	post: async ({user, pass}) => {
		const id = notifyLoaded(null, null, 'loading')

		try {
			const res = await post(BASE_ROUTE, {user, pass})

			return commonThen(id, res)
		} catch (err) {
			commonCatch(id, err)
		}
	},
	delete: async () => {
		const id = notifyLoaded(null, null, 'loading')

		try {
			const res = await del(BASE_ROUTE)

			return commonThen(id, res)
		} catch (err) {
			commonCatch(id, err)
		}
	},
}

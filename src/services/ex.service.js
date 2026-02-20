import {initLoading} from '@/components/utils/Notifications'

import {commonCatch, commonCatchGet, commonThen} from '@/helpers/utils/axios'

import {get, post} from '@/lib/axios'

const BASE_ROUTE = '/example'

export const __example = {
	get: {
		one: null,
		all: async () => {
			try {
				const res = await get(BASE_ROUTE)

				return res.data
			} catch (e) {
				commonCatchGet(e)
			}
		},
		many: null,
	},
	post: {
		one: async (body) => {
			const notyId = initLoading()

			try {
				const res = await post(BASE_ROUTE, body)

				return commonThen(notyId, res)
			} catch (err) {
				commonCatch(notyId, err)
			}
		},
	},
}

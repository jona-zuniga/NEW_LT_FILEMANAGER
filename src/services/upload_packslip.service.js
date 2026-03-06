import axios from 'axios'

import {notifyLoaded} from '@/components/utils/Notifications'

import {commonCatch, commonThen} from '@/helpers/utils/axios'

const BASE_ROUTE = '/upload_packslip'

export const __upload_packslip = {
	post: async (body) => {
		const id = notifyLoaded(null, null, 'loading')
		try {
			const res = await axios.post(BASE_ROUTE, body, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				baseURL: '/api',
				withCredentials: true,
				credentials: 'include',
				timeout: 60000,
			})
			return commonThen(id, res)
		} catch (err) {
			commonCatch(id, err)
		}
	},
}

import axios from 'axios'

import {notifyLoaded} from '@/components/utils/Notifications'

import {commonCatch, commonThen} from '@/helpers/utils/axios'

const BASE_ROUTE = '/upload_invoice'

export const __upload_invoice = {
	post: async (body) => {
		console.log('body', body)
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
	}
}

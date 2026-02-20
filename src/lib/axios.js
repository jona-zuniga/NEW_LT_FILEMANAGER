import axios from 'axios'

const ax = axios.create({
	baseURL: '/api',
	withCredentials: true,
	credentials: 'include',
	timeout: 60000,
})

ax.interceptors.request.use((config) => {
	config.headers = {
		authorization: '',
		'Content-Type': 'application/json',
	}
	return config
})

const {get, post, put, delete: del, patch, options, head} = ax
export {del, get, head, options, patch, post, put}

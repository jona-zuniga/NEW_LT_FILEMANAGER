import {isAxiosError} from 'axios'

import {notifyLoaded} from '@/components/utils/Notifications'

import {ERRNET} from '@/constants/responses'

/**
 * Common catch for axios is used for handle axios errors and show notification in methods diferent from get
 * @param {*} notyId notification id for update existing notification
 * @param {*} err Error
 * @throws ERRNET || err.response.data
 */
export const commonCatch = (notyId, err) => {
	if (isAxiosError(err)) {
		notifyLoaded(notyId, err.response.status, err.response.data)

		throw err.response.data
	}

	console.error(err)
	notifyLoaded(notyId, ERRNET.status, ERRNET.data)
	throw ERRNET
}

/**
 * Common catch for axios get is used for handle axios errors only in get requests
 * @param {*} err
 * @throws ERRNET || err.response.data
 */
export const commonCatchGet = (err) => {
	console.error(err)

	if (isAxiosError(err)) {
		throw err.response.data
	}

	throw ERRNET
}

/**
 * Common then for axios is used for handle axios response
 * @param {*} notyId notification id for update existing notification
 * @param {*} res Axios response
 * @returns Axios response
 */
export const commonThen = (notyId, res) => {
	notifyLoaded(notyId, res.status, res.data)
	return res
}

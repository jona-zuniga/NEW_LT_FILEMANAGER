'use client'

import {useEffect, useState} from 'react'

export const useStore = (store, callback) => {
	const result = store(callback)
	const [data, setData] = useState()

	useEffect(() => {
		setData(result)
	}, [result])

	return data
}

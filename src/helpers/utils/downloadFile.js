import {initLoading, notifyLoaded} from '@/components/utils/Notifications'

import {OK200} from '@/constants/responses'

export const downloadFile = async (route, fileName = 'report.pdf') => {
	const notyId = initLoading()
	try {
		const response = await fetch(route)

		if (!response.ok) {
			notifyLoaded(notyId, response.status, 'error_downloading_file')
			throw new Error('Network response was not ok')
		}

		const blob = await response.blob()
		const url = window.URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.href = url
		a.download = fileName
		document.body.appendChild(a)
		a.click()
		a.remove()

		window.URL.revokeObjectURL(url)
		notifyLoaded(notyId, OK200.status, 'file_downloaded')
	} catch (error) {
		notifyLoaded(notyId, OK200.status, 'error_downloading_file')
		console.error('Error downloading the file:', error)
	}
}

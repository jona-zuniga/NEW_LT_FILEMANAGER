import {useEffect} from 'react'

import {socket} from '@/socket'

/**
 * Hook fro call socket events
 * @param {*} event event name, use keys in constants/websockets.js
 * @param {*} onReceive function to call when receive event (optional)
 * @returns
 */
export default function useSocketEvent(event, onReceive, deps = []) {
	const isConnected = socket?.connected

	/**
	 * Emit event to socket
	 * @param {*} sentData data to send in event
	 */
	const emit = (sentData) => {
		if (isConnected) {
			socket?.emit(event, sentData ?? null)
		} else {
			console.warn('⚠️ Is disconnected', isConnected)
			console.warn(`The event that dispatch this ${event}`)
		}
	}

	useEffect(() => {
		if (socket) {
			const handleOn = (data) => {
				if (typeof onReceive === 'function') {
					onReceive(data)
				}
			}

			if (typeof onReceive === 'function') {
				socket?.on(event, handleOn)

				return () => {
					socket?.off(event, handleOn)
				}
			}
		}
	}, [onReceive, socket, ...deps])

	return {isConnected, socket, emit}
}

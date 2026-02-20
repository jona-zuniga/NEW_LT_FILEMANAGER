import {EVSWebSockets} from '@/constants/websockets'

export const EvHello = (socket) => {
	socket.on(EVSWebSockets.HELLO, (msg) => {
		socket.broadcast.emit(EVSWebSockets.HELLO, msg)
	})
}

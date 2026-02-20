import {Server as ServerIO} from 'socket.io'

import {EvHello} from '@/webSocketsEvs/general'

export const config = {
	api: {
		bodyParser: false,
	},
}

const ioHandler = (req, res) => {
	console.info('🔌 Socket.io server is starting...', req.method)

	const path = '/api/socket'
	if (!res.socket.server.io) {
		const httpServer = res.socket.server
		const io = new ServerIO(httpServer, {
			path: path,
			addTrailingSlash: false,
		})

		console.info(`Socket.io server is ready, listening at ${path}`)

		io.on('connect', (socket) => {
			console.info('✅ Socket.io client connected => ' + socket.id)

			socket.on('disconnect', () => {
				console.info('⚠️ Socket.io client disconnected => ' + socket.id)
			})

			// Events
			EvHello(socket, io)
		})

		res.socket.server.io = io
	} else {
		console.info('Socket.io server already running at')
	}

	res.end()
}

export default ioHandler

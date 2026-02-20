const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const moment = require('moment')
const { config } = require('dotenv')
config({
	path: '.env.local',
})

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.APP_PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	createServer(async (req, res) => {
		try {
			const parsedUrl = parse(req.url, true)

			if (!req.url.includes('/_next')) {
				const start = new Date()
				console.info(
					`${moment().format('HH:MM:ss')} > \x1b[36mReceived request:\x1b[0m ${req.method} ${req.url}`,
				)
				await handle(req, res, parsedUrl)
				const end = new Date()
				const elapsed = end - start
				console.info(
					`${moment().format('YYYY-MM-DD HH:mm:ss')} > \x1b[32mResponse sent:\x1b[0m ${req.method
					} ${req.url} - \x1b[33m${res.statusCode}\x1b[0m (\x1b[35m${elapsed}ms\x1b[0m)`,
				)
			}

			await handle(req, res, parsedUrl)
		} catch (err) {
			console.error('Error occurred handling', req.url, err)
			res.statusCode = 500
			res.end('internal server error')
		}
	})
		.once('error', (err) => {
			console.error(err)
			process.exit(1)
		})
		.listen(port, () => {
			console.info(`\x1b[32m> 🚀 Ready on http://${hostname}:${port}\x1b[0m`)
		})
})

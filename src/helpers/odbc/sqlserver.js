import sql from 'mssql'

const msSqlConfig = {
	user: process.env.MSSQL_USER,
	password: process.env.MSSQL_PWD,
	database: process.env.MSSQL_DB_NAME,
	server: process.env.MSSQL_HOST,
	port: Number(process.env.MSSQL_PORT),
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 60000,
	},
	options: {
		encrypt: false,
		trustServerCertificate: true,
		cryptoCredentialsDetails: {minVersion: 'TLSv1'},
		appName: 'Inventory_system_application',
	},
	debug: true,
}

let pool

async function initializePool() {
	if (!pool) {
		try {
			pool = await sql.connect(msSqlConfig)
			console.info('SQL Pool connected')
		} catch (err) {
			console.error('Error initializing SQL Pool: ', err)
			throw err
		}
	}
}

async function closePool() {
	if (pool) {
		try {
			await pool.close()
			console.info('SQL Pool closed')
		} catch (err) {
			console.error('Error closing SQL Pool: ', err)
		}
	}
}

process.on('SIGINT', async () => {
	console.info('SIGINT signal received: closing SQL Pool')
	await closePool()
	process.exit(0)
})

process.on('SIGTERM', async () => {
	console.info('SIGTERM signal received: closing SQL Pool')
	await closePool()
	process.exit(0)
})

/**
 * Execute a query in SQL Server
 * @param {*} query Sql query
 * @param {*} params Sql params object
 * @param {*} onlyRecordset If true, only return recordset, else return full result
 * @returns
 */
export default async function sqlserver(query, params = {}, onlyRecordset = true) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async function (resolve, reject) {
		try {
			await initializePool()
			let req = pool.request()
			Object.entries(params).map(([k, v]) => req.input(k, v))

			const result = await req.query(query)
			if (onlyRecordset) resolve(result.recordset)
			else resolve(result)
		} catch (err) {
			console.error('SQL Server error:', err)
			reject(err)
		}
	})
}

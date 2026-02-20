import mariadb from 'mariadb'

/**
 * Function to connect to MariaDB
 * @param {*} query SQL command in string
 * @returns json
 */

export default function mysql(query, params = []) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async function (resolve, reject) {
		let connection

		try {
			connection = await mariadb.createConnection({
				user: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_SCHEMANM,
				host: process.env.DB_HOSTIPID,
				port: process.env.DB_PORT,
				connectTimeout: 5000,
				allowPublicKeyRetrieval: true,
				supportBigNumbers: true,
				//bigNumberStrings: true,
			})
			const result = await connection.query(query, params)
			resolve(result)
		} catch (err) {
			// catches errors in getConnection and the query
			reject(err)
		} finally {
			if (connection) {
				// the connection assignment worked, must release
				try {
					await connection.destroy()
				} catch (e) {
					console.error(e)
				}
			}
		}
	})
}

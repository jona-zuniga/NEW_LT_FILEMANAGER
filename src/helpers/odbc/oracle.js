import oracledb from 'oracledb'

// if (Os.platform() === 'win32' || Os.platform() === 'win64') {
// 	try {
// 		oracledb.initOracleClient({libDir: `${process.env.ORA_CLIENT}`});
// 	} catch (err) {
// 		console.error('Whoops!');
// 		console.error(err);
// 		process.exit(1);
// 	}
// } else if (Os.platform() === 'linux') oracledb.initOracleClient();

/**
 * Function to connect to OracleDB
 * @param {*} query SQL command in string
 * @returns json
 */

export default function oracle(query, params = []) {
	 
	return new Promise(async function (resolve, reject) {
		let connection
		try {
			connection = await oracledb.getConnection({
				user: process.env.ORA_USERNAME,
				password: process.env.ORA_PASSWORD,
				connectString: process.env.ORA_HOSTIPID,
			})

			const result = await connection.execute(query, params, {
				outFormat: oracledb.OBJECT,
			})

			resolve(result.rows)
		} catch (err) {
			// Captura errores en getConnection y la consulta
			reject(err)
		} finally {
			if (connection) {
				// La asignación de la conexión funcionó, se debe liberar
				try {
					await connection.release()
				} catch (e) {
					console.error(e)
				}
			}
		}
	})
}

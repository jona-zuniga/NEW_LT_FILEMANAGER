import { ERR500, OK200 } from '@/constants/responses'
import sqlserver from '@/helpers/odbc/sqlserver'
import mysql from '@/helpers/odbc/mysql'
import oracle from '@/helpers/odbc/oracle'

/**
 * Ping endpoint to test all ODBC connections
 * @param {*} req NextRequest object
 * @returns Response with connection status
 */
export async function GET(req) {
	const results = {
		timestamp: new Date().toISOString(),
		status: 'pong',
		connections: {}
	}

	// Test SQL Server connection
	try {
		await sqlserver('SELECT 1 as ping')
		results.connections.sqlserver = {
			status: 'connected',
			message: 'pong'
		}
	} catch (error) {
		results.connections.sqlserver = {
			status: 'error',
			message: error.message
		}
	}

	// Test MySQL/MariaDB connection
	try {
		await mysql('SELECT 1 as ping')
		results.connections.mysql = {
			status: 'connected',
			message: 'pong'
		}
	} catch (error) {
		results.connections.mysql = {
			status: 'error',
			message: error.message
		}
	}

	// Test Oracle connection
	try {
		await oracle('SELECT 1 as ping FROM dual')
		results.connections.oracle = {
			status: 'connected',
			message: 'pong'
		}
	} catch (error) {
		results.connections.oracle = {
			status: 'error',
			message: error.message
		}
	}

	// Check if any connection failed
	const hasErrors = Object.values(results.connections).some(conn => conn.status === 'error')

	if (hasErrors) {
		return Response.json(results, {
			...ERR500,
			status: 500
		})
	}

	return Response.json(results, {
		...OK200,
		status: 200
	})
}

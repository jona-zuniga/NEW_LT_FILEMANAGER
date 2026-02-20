import sqlserver from '../odbc/sqlserver';

/* 
    Only make this when you have a query to execute
    multiple times on the server side, otherwise, use the endpoint
*/

export async function example() {
	const data = await sqlserver('SELECT * FROM table WHERE id = @id', {id: 1});

	return data;
}

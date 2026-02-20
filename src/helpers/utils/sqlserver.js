/**
 * When use JSON PATH in SQL Server, you can use this function for convert to json
 * @param {*} data result of query
 * @param {*} col column to extract json
 * @returns 
 */
export const getSqlJsonPAth = (data, col = 'json') => {
	const jsonRow = data[0]?.[col]

	if (!jsonRow) {
		return []
	}

	const jsonData = JSON.parse(jsonRow)

	return jsonData
}

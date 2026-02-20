//* Common response templates

/* Errors response */
const ERR401 = {status: 401, statusText: 'not_Authenticate'}
const ERR404 = {status: 404, statusText: 'not_Found'}
const ERR403 = {status: 403, statusText: 'forbidden'}
const ERR405 = {status: 405, statusText: 'not_allowed'}
const ERR409 = {status: 409, statusText: 'already_exist'}
const ERR400 = {status: 400, statusText: 'bad_request'}
const ERR500 = {status: 500, statusText: 'data_get_error'}
const ERR422 = {status: 422, statusText: 'request_denied'}
const ERR410 = {status: 410, statusText: 'request_cancelled'}

/* OK response */
const OK200 = {status: 200, statusText: 'correct'}
const OK207 = {status: 207, statusText: 'partial_saved'}

/* Errors request */
const ERRNET = {status: 10404, statusText: 'network_error'}
const ERRSUBMIT = {status: 10500, statusText: 'submit_error'}

export {
	ERR400,
	ERR401,
	ERR403,
	ERR404,
	ERR405,
	ERR409,
	ERR410,
	ERR422,
	ERR500,
	ERRNET,
	ERRSUBMIT,
	OK200,
	OK207,
}

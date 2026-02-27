/**
 * Verifica si el usuario tiene permiso para una acción específica
 * @param {Object} actions - Objeto de acciones del ACL (ej: { EditHR: { action_type: 'POST' } })
 * @param {string} actionName - Nombre de la acción a verificar
 * @param {string} actionType - Tipo de la acción (GET, POST, DELETE, etc.) - opcional
 * @returns {boolean}
 */
export function hasAction(actions, actionName, actionType = null) {
	if (!actions || typeof actions !== 'object') return false

	// Verificar si la acción existe en el objeto
	const action = actions[actionName]
	if (!action) return false

	// Si existe la acción, está permitida
	// Opcionalmente verificar el tipo si se especifica
	if (actionType && action.action_type !== actionType) return false

	return true
}

/**
 * Obtiene todos los permisos de formularios desde el ACL
 * @param {Object} acl - Objeto ACL completo
 * @param {string} page - Nombre de la página
 * @returns {Object} Objeto con permisos por formulario
 */
export function getFormPermissions(acl, page = 'web') {
	const actions = acl?.['LT HR New Hires']?.pages?.[page]?.actions

	return {
		sa: hasAction(actions, 'getWeb', 'GET'),
	}
}

/**
//  * Mapea el rol del formulario al nombre de la acción
//  * @param {string} formRole - Rol del formulario (hr, sf, lh, s)
//  * @returns {string} Nombre de la acción de edición
//  */
// export function getFormActionName(formRole) {
// 	const actionMap = {
// 		hr: 'EditHR',
// 		sf: 'EditSafety',
// 		lh: 'EditLeadHand',
// 		s: 'EditSupervisor',
// 	}
// 	return actionMap[formRole] || null
// }

"use client"

import { APPNAME } from '@/constants/roles'
import { createContext, useContext, useMemo } from 'react'

const UserContext = createContext({
	user: null,
	name: null,
	role: null,
})

/**
 * Get user context
 * @returns
 */
export const useUser = () => useContext(UserContext)

/**
 * User provider is used for share user data
 * @param {*} children
 * @param {*} user
 * @returns
 */

export const UserConsumer = UserContext.Consumer

/**
 * User provider is used for share user data from cookie
 * @param {*} children
 * @param {*} user
 * @returns
 */
export const UserProvider = ({children, user, acl}) => {
	const userData = useMemo(
		() =>
			user ?? {},
	)

	const aclData = useMemo(
		() =>
			acl?.[APPNAME] ?? null,
		[acl],
	)

	return <UserContext.Provider value={{...(userData ?? {}), role: aclData?.group_name, acl: aclData?.pages}}>
		{children}     
	</UserContext.Provider>
}

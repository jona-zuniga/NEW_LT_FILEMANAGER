import {useQueryClient} from '@tanstack/react-query'
import {createContext, useContext} from 'react'

import {EVSWebSpckets} from '@/constants/websockets'

import useSocketEvent from '@/hooks/useSocketEvent'

const ReloadContext = createContext({
	emitReload: (queries = []) => {
		queries
	},
})

/**
 * Get reload context
 * @returns 
 */
export function useReloadQueries() {
	return useContext(ReloadContext)
}

/**
 * This context is used for receive an emit reloads in sockets using list of keys in constants/queryKeys.js
 * @param {*} param0 
 * @returns 
 */
export function ReloadQueriesProvider({children}) {
	const queryClient = useQueryClient()

	// Emit reload function
	const {emit} = useSocketEvent(EVSWebSpckets.RELOAD, async (data) => {

		//Sleep with random value between 1 and 3 seconds
		await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000))

		queryClient.invalidateQueries(data)
	})

	/**
	 * Emit reload function
	 * @param {*} queries list of keys in constants/queryKeys.js
	 * @returns
	 */
	const emitReload = (queries = []) => {
		queryClient.invalidateQueries(queries)
		emit(queries)
	}

	return <ReloadContext.Provider value={{emitReload}}>{children}</ReloadContext.Provider>
}

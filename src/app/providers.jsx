'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { useParams } from 'next/navigation'

import { I18nProvider } from '@/components/providers/I81nProvider'
import ClientThemeWrapper from '@/components/providers/MantineThemeProvider'
import { UserProvider } from '@/components/providers/UserProvider'
import { ImageViewerProvider } from '@/components/utils/ImageViewer'

import { langs } from '@/constants/langs'

import getI18nLang from '@/helpers/utils/getI18nLang'
import { ToasterComponent } from '@/components/providers/Toaster'
import { JSONViewer } from '@/components/utils/JSONViewer'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	})
}

let browserQueryClient = undefined

function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

export default function Providers({ children, userData, acl }) {
	const queryClient = getQueryClient()
	const { locale: lang } = useParams()
	const messages = getI18nLang(lang ?? langs.en)

	/** TODO: Uncomment this if you need implement sockets */

	// useEffect(() => {
	// 	if (socket.connected) {
	// 		onConnect()
	// 	}

	// 	function onConnect() {
	// 		console.log('Socket.io client connected')
	// 	}

	// 	function onDisconnect() {
	// 		console.log('Socket.io client disconnected')
	// 	}

	// 	socket.on('connect', onConnect)
	// 	socket.on('disconnect', onDisconnect)

	// 	return () => {
	// 		socket.off('connect', onConnect)
	// 		socket.off('disconnect', onDisconnect)
	// 	}
	// }, [])



	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange>
			<UserProvider user={userData} acl={acl}>
				<QueryClientProvider client={queryClient}>
					<I18nProvider messages={messages} lang={lang}>
						<ImageViewerProvider>
							<ToasterComponent />
							<ClientThemeWrapper>{children}</ClientThemeWrapper>
						</ImageViewerProvider>
					</I18nProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

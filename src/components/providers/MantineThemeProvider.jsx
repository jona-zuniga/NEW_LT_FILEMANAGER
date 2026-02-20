'use client'

import {ColorSchemeScript, MantineProvider} from '@mantine/core'
import {useTheme} from 'next-themes'
import React, {useState} from 'react'

export default function ClientThemeWrapper({children}) {
	const {resolvedTheme} = useTheme()
	const [mounted, setMounted] = useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	// Evita renderizar hasta que el tema esté listo, previene mismatch
	if (!mounted) return null
	return (
		<>
			<ColorSchemeScript forceColorScheme={resolvedTheme} />
			<MantineProvider forceColorScheme={resolvedTheme}>{children}</MantineProvider>
		</>
	)
}

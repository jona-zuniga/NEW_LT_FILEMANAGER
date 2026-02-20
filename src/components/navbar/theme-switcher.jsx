'use client'

import {useT} from '../providers/I81nProvider'
import CustomSwitch from '../utils/CustomSwitch'
import Icons from '../utils/Icons'
import {useTheme} from 'next-themes'
import React from 'react'

import {cn} from '@/lib/utils'

export default function ThemeSwitcher({isOpen = true}) {
	const t = useT()
	const {theme, setTheme, resolvedTheme} = useTheme()

	const onToggle = () => {
		const currentTheme = theme === 'system' ? resolvedTheme : theme
		setTheme(currentTheme === 'dark' ? 'light' : 'dark')
	}

	const CollapsedButton = () => {
		return (
			<div className="pointer-events-none flex items-center justify-center rounded-full border border-slate-300 p-2 dark:border-slate-700">
				{theme === 'dark' ? (
					<Icons.Misc.Sun className="size-5 dark:text-white" />
				) : (
					<Icons.Misc.Moon className="size-5 dark:text-slate-400" />
				)}
			</div>
		)
	}

	const ExpandedButton = () => {
		return (
			<>
				<div className="pointer-events-none font-semibold">{t('dark_mode')}</div>
				<CustomSwitch checked={theme === 'dark'} className="pointer-events-none" />
			</>
		)
	}

	return (
		<li
			className={cn(
				'mb-2 flex w-full cursor-pointer select-none items-end justify-between p-2',
				{
					'items-center justify-center p-0': !isOpen,
				},
			)}
			onClick={onToggle}>
			{isOpen && <ExpandedButton />}
			{!isOpen && <CollapsedButton />}
		</li>
	)
}

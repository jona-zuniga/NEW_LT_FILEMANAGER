'use client'

import {Menu} from '@/components/navbar/menu'
import {SidebarToggle} from '@/components/navbar/sidebar-toggle'

import {useSidebar} from '@/hooks/useSidebar'
import {useStore} from '@/hooks/useStore'

import {cn} from '@/lib/utils'
import { useLang } from '../providers/I81nProvider'
import React from 'react'
import { getRoutes } from './getRoutes'

export function Sidebar(props) {
	const sidebar = useStore(useSidebar, (x) => x)

	if (!sidebar) return null

	const {isOpen, toggleOpen, getOpenState, setIsHover, settings} = sidebar

	return (
		<>
			<aside
				className={cn(
					'fixed left-0 top-0 z-40 h-screen bg-white transition-[width] duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800 lg:translate-x-0',
					!isOpen && '-translate-x-full',
					!getOpenState() ? 'w-[51px]' : 'max-w-64',
					settings.disabled && 'hidden',
				)}>
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className="relative flex h-full flex-col overflow-y-auto shadow-md dark:shadow-slate-800">
					<Menu isOpen={getOpenState()} {...props} />
				</div>
			</aside>
			<SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
		</>
	)
}

export default function SideBarLayout({children, ...props}) {
	const sidebar = useStore(useSidebar, (x) => x)
	if (!sidebar) return null
	const {getOpenState, settings} = sidebar
	return (
		<>
			<Sidebar {...props} />
			<main
				className={cn(
					'h-full flex-1 bg-zinc-50 p-1 transition-[margin-left] duration-300 ease-in-out dark:bg-slate-900',
					!settings.disabled && (!getOpenState() ? 'lg:ml-[51px]' : 'lg:ml-64'),
				)}>
				{children}
			</main>
		</>
	)
}

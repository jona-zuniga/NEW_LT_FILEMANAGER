'use client'

import { useMutation } from '@tanstack/react-query'
import { LogIn, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { FaEllipsis } from 'react-icons/fa6'
import { useLang, useT } from '../providers/I81nProvider'
import { useUser } from '../providers/UserProvider'
import { LtlogoFull } from '../utils/LtLogo'
import ThemeSwitcher from './theme-switcher'
import { UserNav } from './user-nav'

import { CollapseMenuButton } from '@/components/navbar/collapse-menu-button'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { __login } from '@/services/login.service'

import { cn } from '@/lib/utils'
import React from 'react'
import { getRoutes } from './getRoutes'

const LoginButton = ({mutLogout, isOpen}) => {
	const t = useT()
	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						onClick={() => mutLogout.mutate()}
						variant="outline"
						className="border-gray-200 px-2 py-1 text-cyan-500 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white">
						<span className={cn(isOpen === false ? '' : 'mr-4')}>
							<LogIn size={18} />
						</span>
						{isOpen && (
							<p
								className={cn(
									'whitespace-nowrap',
									isOpen === false ? 'hidden opacity-0' : 'opacity-100',
								)}>
								{t('login')}
							</p>
						)}
					</Button>
				</TooltipTrigger>
				{!isOpen && <TooltipContent side="right">Log in</TooltipContent>}
			</Tooltip>
		</TooltipProvider>
	)
}

const LogoutButton = ({mutLogout, isOpen}) => {
	const t = useT()

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						onClick={() => mutLogout.mutate()}
						variant="outline"
						className="border-gray-200 px-2 py-1 text-red-500 hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-red-400
						dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-white
						">
						<span className={cn(isOpen === false ? '' : 'mr-4')}>
							<LogOut size={18} />
						</span>
						{isOpen && (
							<p
								className={cn(
									'whitespace-nowrap',
									isOpen === false ? 'hidden opacity-0' : 'opacity-100',
								)}>
								{t('logout')}
							</p>
						)}
					</Button>
				</TooltipTrigger>
				{!isOpen && <TooltipContent side="right">Sign out</TooltipContent>}
			</Tooltip>
		</TooltipProvider>
	)
}

const UserSection = ({isOpen, version}) => {
	const {user} = useUser()
	const {lang} = useLang()

	const mutLogout = useMutation({
		mutationFn: __login.delete,
		onSuccess: () => {
			window.location.replace(`/${lang}/login`)
		},
		onError: (err) => {
			console.error(err)
		},
	})

	return (
		<li className="flex w-full items-end space-y-1">
			<div className="flex w-full flex-col space-y-3">
				<UserNav isOpen={isOpen} version={version} />
				{user?.length > 0 ? (
					<LogoutButton mutLogout={mutLogout} isOpen={isOpen} />
				) : (
					<LoginButton mutLogout={mutLogout} isOpen={isOpen} />
				)}
			</div>
		</li>
	)
}

export function Menu({routesKey = null, isOpen, version}) {
	const pathname = usePathname()
	const {lang} = useLang()
	const {role, acl} = useUser()
	const t = useT()
	const menuList = getRoutes(lang, routesKey, role, acl)

	const isActive = (href) => {
		return pathname == href
	}

	return (
		<nav
			className={cn(
				'mt-0 flex h-full  w-full flex-1 flex-col overflow-y-auto overflow-x-hidden p-1 transition-transform',
			)}>
			<div
				className={cn('block h-[36px] pl-4 pr-10 duration-300', {
					'-translate-x-full': !isOpen,
				})}>
				<LtlogoFull />
			</div>
			<ul className="flex h-full flex-col items-start">
				{menuList.map(({groupLabel, menus}, index) => (
					<li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
						{(isOpen && groupLabel) || isOpen === undefined ? (
							<p className="max-w-[248px] truncate px-2 pb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
								{t(groupLabel)}
							</p>
						) : !isOpen && isOpen !== undefined && groupLabel ? (
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger className="w-full">
										<div className="flex items-center justify-center">
											<FaEllipsis className="h-3 w-3" />
										</div>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>{t(groupLabel)}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<p className="pb-2"></p>
						)}
						{menus.map(({href, label, icon: Icon, submenus}, index) =>
							!submenus || submenus.length === 0 ? (
								<div className="w-full" key={index}>
									<TooltipProvider disableHoverableContent>
										<Tooltip delayDuration={100}>
											<TooltipTrigger asChild>
												<Button
													variant={isActive(href) ? 'default2' : 'ghost'}
													className={cn(
														'mb-1 flex h-10 items-center',
														isOpen === false
															? 'justify-center'
															: 'w-full justify-start',
													)}
													asChild>
													<a href={href} className="space-x-2">
														<span>
															<Icon size={18} />
														</span>
														{isOpen && (
															<p
																className={cn(
																	'max-w-[200px] truncate',
																	isOpen === false
																		? 'translate-x-96 opacity-0'
																		: 'translate-x-0 opacity-100',
																)}>
																{t(label)}
															</p>
														)}
													</a>
												</Button>
											</TooltipTrigger>
											{isOpen === false && (
												<TooltipContent side="right">
													{t(label)}
												</TooltipContent>
											)}
										</Tooltip>
									</TooltipProvider>
								</div>
							) : (
								<div className="w-full" key={index}>
									<CollapseMenuButton
										icon={Icon}
										label={label}
										active={isActive(href)}
										submenus={submenus}
										isOpen={isOpen}
									/>
								</div>
							),
						)}
					</li>
				))}
				<div className="flex w-full grow flex-col justify-end gap-1">
					<ThemeSwitcher isOpen={isOpen} />
					<UserSection isOpen={isOpen} version={version} />
				</div>
			</ul>
		</nav>
	)
}

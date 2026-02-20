'use client'

import {useLang, useT} from '../providers/I81nProvider'
import {useUser} from '../providers/UserProvider'
import Icons from '../utils/Icons'
import {ChevronDown, Languages} from 'lucide-react'
import {useMemo, useState} from 'react'

import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'

import {langs} from '@/constants/langs'

import {cn} from '@/lib/utils'

export function UserNav({isOpen, version}) {
	const {name, role, user} = useUser()
	const t = useT()
	const {changeLang, lang} = useLang()
	const [isOpenNav, setIsOpenNav] = useState(false)

	const UserInitials = useMemo(() => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
	}, [name])

	return (
		<DropdownMenu onOpenChange={setIsOpenNav}>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									'relative h-max rounded-full outline-hidden hover:outline-hidden focus:outline-hidden',
									{
										'justify-start rounded-md': isOpen,
										'mx-auto h-9 w-9': !isOpen,
									},
								)}>
								{!isOpen && (
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-transparent">
											{UserInitials?.length ? (
												UserInitials
											) : (
												<Icons.Misc.User className="h-6 w-6" />
											)}
										</AvatarFallback>
									</Avatar>
								)}
								{isOpen && (
									<div className="relative flex w-full flex-col space-y-1">
										<span className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-slate-500 transition-all hover:bg-slate-400/20 hover:text-slate-500 dark:bg-slate-800/20 dark:text-slate-400">
											<ChevronDown
												className={cn(
													'h-4 w-4 transition-transform duration-700 ease-in-out',
													isOpenNav === false ? 'rotate-180' : 'rotate-0',
												)}
											/>
										</span>
										<div className="flex w-full text-left">
											<p className="text-sm font-medium leading-none">
												{name?.length ? name : t('anonymous')}
											</p>
											{user?.length ? (
												<p className="px-2 text-sm leading-none text-slate-500 dark:text-slate-400">
													#{user}
												</p>
											) : null}
										</div>
										{role && (
											<div className="flex w-full flex-col space-y-1 text-left">
												<p className="text-sm font-medium leading-none">
													Role:
													<span className="px-1 text-xs font-normal">
														{role}
													</span>
												</p>
											</div>
										)}
									</div>
								)}
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					{!isOpen && <TooltipContent side="right">Profile</TooltipContent>}
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent className="z-99999999 ml-[30px] w-56" align="start" forceMount>
				{user?.length ? (
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{name}</p>
							<p className="text-sm leading-none text-slate-500 dark:text-slate-400">
								#{user}
							</p>
						</div>
					</DropdownMenuLabel>
				) : null}
				{role && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">Role: {role}</p>
							</div>
						</DropdownMenuLabel>
					</>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:cursor-pointer" asChild>
						<button
							className="flex w-full items-center"
							onClick={() => changeLang(lang == langs.en ? langs.es : langs.en)}>
							<Languages className="mr-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
							{`${t('change_lang')} (${lang})`}
						</button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel className="font-normal">
					<span className="text-nowrap text-xs font-semibold">{`Version: ${version}`}</span>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

'use client'

import {useT} from '../providers/I81nProvider'
import {buttonVariants} from '../ui/button'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../ui/tooltip'
import Icons from './Icons'
import {LtlogoFull} from './LtLogo'
import UserAvatar from './UserAvatar'
import {useMutation} from '@tanstack/react-query'
import clsx from 'clsx'
import {MenuIcon} from 'lucide-react'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'
import React, {useContext, useState} from 'react'
import {Menu, Sidebar} from 'react-pro-sidebar'

import {langs} from '@/constants/langs'

import {__login} from '@/services/login.service'

const ContextNavBar = React.createContext({
	isOpen: false,
	setIsOpen: () => {},
	toggled: false,
	setToggled: () => {},
	isInBreakpoint: false,
})
export const useNavbar = () => useContext(ContextNavBar)

export const NavBarHeader = () => {
	const navBar = useNavbar()

	return (
		<div className="px-1 py-0.5">
			<div
				className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-sm text-[#0058a3] transition-all duration-200 hover:bg-slate-400/20"
				onClick={() => {
					navBar.setIsOpen(!navBar.isOpen)
					navBar.setToggled(!navBar.toggled)
				}}>
				{navBar.isOpen && <LtlogoFull />}
				<div className="px-0.5">
					<MenuIcon></MenuIcon>
				</div>
			</div>
		</div>
	)
}

export const NavBarFooter = ({version}) => {
	const {isOpen} = useNavbar()
	const params = useParams()
	const locale = params?.locale ?? langs.en
	const t = useT()

	const mut = useMutation({
		mutationFn: __login.delete,
		onSuccess: () => {
			window.location.replace(`/${locale}/login`)
		},
		onError: (err) => {
			console.error(err)
		},
	})

	const handleLogout = (e) => {
		e.preventDefault()
		mut.mutate()
	}

	return (
		<div className="w-full items-center text-white">
			{/* User avatar */}
			<div className="w-full">
				<UserAvatar collapsed={!isOpen} />
			</div>
			<button
				className="flex w-full scale-95 cursor-pointer items-center rounded-md border border-gray-200 px-2 py-1 text-red-500
						transition-all hover:scale-100 hover:border-red-600 hover:bg-red-600 hover:text-white"
				onClick={handleLogout}>
				<span className={clsx('flex h-full w-fit items-center text-lg')}>
					<Icons.Misc.Logout className="font-semibold" />
				</span>
				{isOpen && <div>{t('logout')}</div>}
			</button>
			{isOpen && (
				<div className="text-xs text-black">
					<span className={clsx('font-semibold')}>{'Version: '}</span>
					{version}
				</div>
			)}
		</div>
	)
}

const NavBarItemContent = ({item: {href, icon, name}, onlyIcon = false}) => {
	const t = useT()

	const params = useParams()
	const path = usePathname()
	const locale = params?.locale ?? langs.en

	return (
		<li
			key={href}
			className={clsx(
				'flex cursor-pointer rounded-md font-semibold transition-all hover:scale-105 hover:bg-[#0058a3] hover:text-white hover:opacity-80 ',
				`/${locale}${href}` == path && 'bg-[#0058a3] text-white',
			)}>
			<Link
				href={`/${locale}${href}`}
				className={clsx(
					'flex w-full flex-row items-center justify-start space-x-2 px-2 py-1 hover:text-white',
					`/${locale}${href}` === path ? 'text-white' : 'text-[#0058a3]',
				)}
				scroll={false}>
				<span className={clsx('m-1 flex h-full w-fit items-center text-lg')}>{icon}</span>
				{!onlyIcon && <span className="w-full">{t(name)}</span>}
			</Link>
		</li>
	)
}

export const NavBarItem = ({item: {href, icon, name}}) => {
	const {isOpen} = useNavbar()
	const t = useT()

	if (!isOpen) {
		return (
			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger>
						<NavBarItemContent item={{href, icon, name}} onlyIcon={!isOpen} />
					</TooltipTrigger>
					<TooltipContent side="right">
						<span className="font-semibold">{t(name)}</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}

	return <NavBarItemContent item={{href, icon, name}} onlyIcon={!isOpen} />
}

function NavBar({items = [], version}) {
	const [isOpen, setIsOpen] = useState(false)
	const [toggled, setToggled] = useState(false)
	const [isInBreakpoint, setInInBreakpoint] = useState(false)

	// const isMediumDevice = useMediaQuery('only screen and (min-width : 769px)')

	// useEffect(() => {
	// 	if (isMediumDevice) {
	// 		setInInBreakpoint(false)
	// 	} else {
	// 		setInInBreakpoint(true)
	// 	}
	// }, [isMediumDevice])

	return (
		<ContextNavBar.Provider value={{isOpen, setIsOpen, toggled, setToggled, isInBreakpoint}}>
			<Sidebar
				className="h-full w-max bg-white"
				collapsed={!isOpen}
				collapsedWidth="52px"
				onBackdropClick={() => {
					setIsOpen(!isOpen)
					setToggled(false)
				}}
				onBreakPoint={(b) => setInInBreakpoint(b)}
				toggled={toggled}
				breakPoint="md">
				<div className="flex h-full w-full flex-col bg-white">
					<NavBarHeader />
					<div className="h-full w-full flex-1">
						<Menu>
							<div className="flex flex-col justify-center space-y-2 px-1">
								{items.map((item) => (
									<NavBarItem item={item} key={item.href} />
								))}
							</div>
						</Menu>
					</div>
					<NavBarFooter version={version} />
				</div>
			</Sidebar>
			{isInBreakpoint && !isOpen && (
				<button
					className={buttonVariants({
						variant: 'outline',
						className: 'fixed bottom-1 left-1 w-max rounded-full',
					})}
					style={{
						zIndex: 9999999,
					}}
					onClick={() => {
						setToggled(!toggled)
						setIsOpen(true)
					}}>
					<MenuIcon></MenuIcon>
				</button>
			)}
		</ContextNavBar.Provider>
	)
}

export default NavBar

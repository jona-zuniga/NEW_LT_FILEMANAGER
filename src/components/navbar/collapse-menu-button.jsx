'use client'

import {useT} from '../providers/I81nProvider'
import {DropdownMenuArrow} from '@radix-ui/react-dropdown-menu'
import {ChevronDown, Dot} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

import {Button} from '@/components/ui/button'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'

import {cn} from '@/lib/utils'

export function CollapseMenuButton({icon: Icon, label, submenus, isOpen}) {
	const pathname = usePathname()
	const t = useT()

	const isActive = (href) => {
		return pathname == href
	}

	const isSubmenuActive = submenus.some((submenu) => isActive(submenu.href))
	const [isCollapsed, setIsCollapsed] = useState(isSubmenuActive)

	return isOpen ? (
		<Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
			<CollapsibleTrigger
				className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
				asChild>
				<Button
					variant={isSubmenuActive ? 'default' : 'ghost'}
					className={cn(
						'h-10 w-full justify-start',
						isOpen === false ? 'translate-x-96 opacity-0' : 'translate-x-0 opacity-100',
					)}>
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center space-x-2">
							<span>
								<Icon size={18} />
							</span>
							{isOpen && (
								<p
									className={cn(
										'max-w-[150px] truncate',
										isOpen
											? 'translate-x-0 opacity-100'
											: '-translate-x-96 opacity-0',
									)}>
									{t(label)}
								</p>
							)}
						</div>
						<div
							className={cn(
								'whitespace-nowrap',
								isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0',
							)}>
							<ChevronDown size={18} className="transition-transform duration-200" />
						</div>
					</div>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				{submenus.map(({href, label}, index) => (
					<Button
						key={index}
						variant={isActive(href) ? 'default' : 'ghost'}
						className="mb-1 h-10 w-full justify-start"
						asChild>
						<Link href={href}>
							<span className="ml-2 mr-4">
								<Dot size={18} />
							</span>
							<p
								className={cn(
									'max-w-[170px] truncate',
									isOpen
										? 'translate-x-0 opacity-100'
										: '-translate-x-96 opacity-0',
								)}>
								{t(label)}
							</p>
						</Link>
					</Button>
				))}
			</CollapsibleContent>
		</Collapsible>
	) : (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant={isSubmenuActive ? 'default' : 'ghost'}
								className="mb-1 h-10 w-full justify-start">
								<div className="flex w-full items-center justify-center">
									<div className="flex items-center space-x-2">
										<span>
											<Icon size={18} />
										</span>
										{isOpen && (
											<p
												className={cn(
													'w-full max-w-[200px] truncate',
													isOpen === false ? 'opacity-0' : 'opacity-100',
												)}>
												{t(label)}
											</p>
										)}
									</div>
								</div>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side="right" align="start" alignOffset={2}>
						{t(label)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent side="right" sideOffset={25} align="start">
				<DropdownMenuLabel className="max-w-[190px] truncate">{t(label)}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{submenus.map(({href, label, active}, index) => (
					<DropdownMenuItem key={index} asChild>
						<Link
							className={`cursor-pointer ${
								((active === undefined && pathname === href) || active) &&
								'bg-slate-100 dark:bg-slate-800'
							}`}
							href={href}>
							<p className="max-w-[180px] truncate">{t(label)}</p>
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuArrow className="fill-border" />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

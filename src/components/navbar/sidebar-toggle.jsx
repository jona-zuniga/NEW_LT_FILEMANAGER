import {MenuIcon} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

export function SidebarToggle({isOpen, setIsOpen}) {
	return (
		<div
			className={cn('fixed left-[10px] top-[5px] z-40 duration-500', {
				'left-[calc(16rem-45px)]': isOpen,
			})}>
			<Button
				onClick={() => setIsOpen?.()}
				className="h-8 w-8 rounded-md"
				variant="outline"
				size="icon">
				<MenuIcon
					className={cn(
						'h-4 w-4 transition-transform duration-700 ease-in-out',
						isOpen === false ? 'rotate-180' : 'rotate-0',
					)}
				/>
			</Button>
		</div>
	)
}

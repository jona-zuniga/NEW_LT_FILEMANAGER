import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover/popover'

export function PopoverBasic({children, content, closeTrigger = null, lengthTrigger = false}) {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent lengthTrigger={lengthTrigger} className="w-80">
				{content}
			</PopoverContent>
			<PopoverClose>{closeTrigger}</PopoverClose>
		</Popover>
	)
}

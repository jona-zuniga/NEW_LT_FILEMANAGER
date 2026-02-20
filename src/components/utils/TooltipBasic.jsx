import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../ui/tooltip'

export function TooltipBasic({children, content}) {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

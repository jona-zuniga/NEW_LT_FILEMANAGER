import {cn} from '@/lib/utils'

export function KeyboardShortcutShow({className, children}) {
	return (
		<div
			className={cn(
				'center border-foreground/20 text-foreground/50 h-5 w-fit min-w-5 rounded-md border bg-white px-1 text-xs',
				className,
			)}>
			<span>{children}</span>
		</div>
	)
}

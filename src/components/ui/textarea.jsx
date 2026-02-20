import * as React from 'react'

import {cn} from '@/lib/utils'

export const Textarea = React.forwardRef(({className, ...props}, ref) => {
	return (
		<textarea
			className={cn(
				`flex min-h-[80px] w-full resize-none rounded-md border border-slate-200 
				bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 
				focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400 
				disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 
				dark:bg-slate-800 dark:text-slate-200`,
				className,
			)}
			onFocus={(e) => e.target.select()}
			ref={ref}
			{...props}
		/>
	)
})
Textarea.displayName = 'Textarea'

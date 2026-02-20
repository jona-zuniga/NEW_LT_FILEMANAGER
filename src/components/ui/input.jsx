import React from 'react'

import {cn} from '@/lib/utils'

export const Input = React.forwardRef(({className, type, value, ...props}, ref) => {
	return (
		<input
			ref={ref}
			type={type}
			value={value}
			onFocus={(e) => e.target.select()}
			className={cn(
				`flex h-10 w-full rounded-md border border-slate-200 
				bg-neutral-50 px-3 py-2 text-sm outline-hidden ring-offset-white 
				file:border-0 file:bg-transparent file:text-sm file:font-medium 
				placeholder:text-slate-500 focus-visible:outline-hidden 
				focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed
				disabled:opacity-50 dark:border-slate-700 
				dark:bg-slate-700 dark:text-slate-200`,
				className,
			)}
			{...props}
		/>
	)
})

Input.displayName = 'Input'

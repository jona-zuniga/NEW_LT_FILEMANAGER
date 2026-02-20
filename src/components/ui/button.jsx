import {Slot} from '@radix-ui/react-slot'
import {cva} from 'class-variance-authority'
import * as React from 'react'

import {cn} from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
	{
		variants: {
			variant: {
				default: `bg-blue-600 text-slate-50 hover:bg-blue-600/90 focus-visible:ring-blue-400 focus-visible:ring-2`,
				secondaryAction: `bg-orange-600 text-slate-50 hover:bg-orange-600/90 focus-visible:ring-orange-400 focus-visible:ring-2`,
				destructive:
					'bg-red-500 text-slate-50 hover:bg-red-500/90 focus-visible:ring-red-400 focus-visible:ring-2',
				confirm:
					'bg-green-500 text-slate-50 hover:bg-green-500/90 focus-visible:ring-green-400 focus-visible:ring-2',
				auth: 'bg-emerald-500 text-slate-50 hover:bg-emerald-500/90 focus-visible:ring-emerald-400 focus-visible:ring-2',
				danger: 'bg-yellow-500 text-slate-50 hover:bg-yellow-500/90 focus-visible:ring-yellow-400 focus-visible:ring-2',
				warning:
					'bg-amber-500 text-slate-50 hover:bg-amber-500/90 focus-visible:ring-amber-400 focus-visible:ring-2',
				outline: `border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
						dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-slate-100
					`,
				'outline-auth': `border border-emerald-500 bg-white hover:bg-emerald-500 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-950 focus-visible:ring-offset-2
						dark:bg-slate-800 dark:border-emerald-700 dark:text-slate-200 dark:hover:bg-emerald-700 dark:hover:text-slate-100 text-emerald-500 dark:text-emerald-500
					`,
				'outline-reject': `border border-red-500 bg-white hover:bg-red-500 hover:text-white focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-2 text-red-500
						dark:bg-slate-800 dark:border-red-700 dark:text-slate-200 dark:hover:bg-red-700 dark:hover:text-slate-100 dark:text-red-500
					`,
				ghost: `hover:bg-slate-200 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
					dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-slate-100
				`,
				'ghost-primary': `bg-blue-100 text-blue-800 hover:bg-blue-300 focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:ring-offset-2
					dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-100
					`,
				'ghost-default': `bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
					dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-950 dark:hover:text-slate-100
					`,
				'ghost-danger': `bg-amber-100 text-amber-900 hover:bg-amber-400 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-950 focus-visible:ring-offset-2
					dark:bg-amber-900 dark:text-amber-200 dark:hover:bg-amber-800 dark:hover:text-amber-100
					`,
				'ghost-confirm': `bg-green-100 text-green-800 hover:bg-green-300 focus-visible:ring-2 focus-visible:ring-green-100 focus-visible:ring-offset-2
					dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 dark:hover:text-green-100
					`,
				'ghost-destructive': `bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-2
					dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 dark:hover:text-red-100
					`,
				info: 'bg-sky-500 text-slate-50 hover:bg-sky-500/90 focus-visible:ring-sky-400 focus-visible:ring-2',
				link: 'text-slate-900 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2',
				secondary: `dark:bg-slate-600 text-slate-50 dark:hover:bg-slate-600/90 dark:focus-visible:ring-slate-400 focus-visible:ring-2
					bg-slate-900 text-slate-50 hover:bg-slate-800/90 focus-visible:ring-slate-400 focus-visible:ring-2
				`,
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

const Button = React.forwardRef(({className, variant, size, asChild = false, ...props}, ref) => {
	const Comp = asChild ? Slot : 'button'
	return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export {Button, buttonVariants}

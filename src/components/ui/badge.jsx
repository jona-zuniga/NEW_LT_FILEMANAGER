import {cva} from 'class-variance-authority'
import * as React from 'react'

import {cn} from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center rounded-full w-max border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
				secondary:
					'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
				destructive:
					'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/80',
				auth: 'border-transparent bg-emerald-600 text-emerald-50 hover:bg-emerald-600/80 dark:bg-emerald-700 dark:text-emerald-50 dark:hover:bg-emerald-700/80',
				confirm:
					'border-transparent bg-green-500 text-slate-50 hover:bg-green-500/80 dark:bg-green-700 dark:text-green-50 dark:hover:bg-green-700/80',
				outline:
					'text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800',
				danger: 'border-transparent bg-yellow-500 text-slate-50 hover:bg-yellow-500/80 dark:bg-yellow-600 dark:text-yellow-50 dark:hover:bg-yellow-600/80',
				ghost: 'border-transparent bg-transparent text-slate-900 hover:bg-slate-100/20 dark:text-slate-50 dark:hover:bg-slate-800/20',
				info: 'border-transparent bg-sky-500 text-slate-50 hover:bg-sky-500/80 dark:bg-sky-700 dark:text-sky-50 dark:hover:bg-sky-700/80',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

function Badge({className, variant, ...props}) {
	return <div className={cn(badgeVariants({variant}), className)} {...props} />
}

export {Badge, badgeVariants}

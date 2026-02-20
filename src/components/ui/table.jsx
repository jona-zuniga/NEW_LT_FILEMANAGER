import * as React from 'react'

import {cn} from '@/lib/utils'

const Table = React.forwardRef(({className, divClassname, ...props}, ref) => (
	<div className={cn('relative w-full overflow-auto', divClassname)}>
		<table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
	</div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef(({className, ...props}, ref) => (
	<thead
		ref={ref}
		className={cn(
			'sticky top-0 border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900 [&_tr]:rounded-sm [&_tr]:border',
			className,
		)}
		{...props}
	/>
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef(({className, ...props}, ref) => (
	<tbody
		ref={ref}
		className={cn(
			'h-full overflow-y-auto rounded-sm border border-slate-200 bg-white font-medium dark:border-slate-700 dark:bg-slate-800',
			className,
		)}
		{...props}
	/>
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef(({className, ...props}, ref) => (
	<tfoot
		ref={ref}
		className={cn('border-t bg-slate-100/50 font-medium ', className)}
		{...props}
	/>
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef(({className, ...props}, ref) => (
	<tr
		ref={ref}
		className={cn(
			'h-12 border-b bg-white text-center align-middle transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
			className,
		)}
		{...props}
	/>
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef(({className, size, ...props}, ref) => (
	<th
		ref={ref}
		style={{width: size ?? 'auto'}}
		className={cn(
			'h-min px-4 text-center align-middle font-medium text-slate-500 first:rounded-tl-md last:rounded-tr ',
			className,
		)}
		{...props}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef(({className, ...props}, ref) => (
	<td
		ref={ref}
		className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
		{...props}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef(({className, ...props}, ref) => (
	<caption ref={ref} className={cn('mt-4 text-sm text-slate-500 ', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

export {Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption}

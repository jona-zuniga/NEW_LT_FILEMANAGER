'use client'

import LtSyncLoader from '../utils/LtSyncLoader'
import {Button} from './button'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import * as React from 'react'

import {cn} from '@/lib/utils'

const Dialog = ({openSet, onOpen, onClose, ...props}) => {
	const {show, setShow} = openSet

	const execOnOpen = () => typeof onOpen === 'function' && onOpen()
	const execOnClose = () => {
		typeof onClose === 'function' && onClose()
	}

	React.useEffect(() => {
		if (show) {
			execOnOpen()
		}
	}, [show])

	// Use the isOpen value from useIsOpen to control the open state of the dialog
	return (
		<DialogPrimitive.Root
			open={show}
			onOpenChange={(isOpenParam) => {
				execOnClose()
				setShow(isOpenParam)
			}}
			{...props}>
			{props.children}
		</DialogPrimitive.Root>
	)
}

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogCloseButton = ({children = 'Cancel', ...props}) => {
	return (
		<DialogClose asChild {...props}>
			<Button variant="ghost">{children}</Button>
		</DialogClose>
	)
}

const DialogOverlay = React.forwardRef(({className, ...props}, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className,
		)}
		{...props}
	/>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(
	({className, isLoading = false, staticMode = true, children, ...props}, ref) => (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
					className,
				)}
				onInteractOutside={(e) => staticMode && e.preventDefault()}
				{...props}>
				{!isLoading && (
					<DialogPrimitive.Close className="absolute right-4 top-4 rounded-xs opacity-70 outline-hidden ring-offset-white transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-800 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
				<div className="relative my-2">
					{children}
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-white/90 p-3 dark:bg-slate-800/90">
							<div className="h-max">
								<LtSyncLoader />
							</div>
						</div>
					)}
				</div>
			</DialogPrimitive.Content>
		</DialogPortal>
	),
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({className, ...props}) => (
	<div
		className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
		{...props}
	/>
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({className, ...props}) => (
	<div
		className={cn(
			'mt-1 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className,
		)}
		{...props}
	/>
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef(({className, ...props}, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn('text-lg font-semibold leading-none tracking-tight', className)}
		{...props}
	/>
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({className, ...props}, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn('text-sm text-slate-500 ', className)}
		{...props}
	/>
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
	Dialog,
	DialogClose,
	DialogCloseButton,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
}

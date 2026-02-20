import { Button } from '../ui/button'
import {
	Dialog,
	DialogCloseButton,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import Icons from '../utils/Icons'
import clsx from 'clsx'
import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function DialogBasic({
	className,
	children,
	openSet,
	onConfirm,
	onOpen,
	onClose,
	actionText,
	title,
	loading = false,
	disabled = false,
	showActions = true,
	customHeader = null,
	actionButtonVariant = 'default',
	cancelButtonVariant = 'ghost',
	targetAcceptButtonRef = null,
	showCancelButton = true,
	isLoading = false,
}) {
	return (
		<Dialog
			openSet={openSet}
			onConfirm={onConfirm}
			onClose={() => {
				openSet.off()
				typeof onClose === 'function' && onClose()
			}}
			onOpen={onOpen}
			className="rounded-md">
			<DialogContent
				isLoading={isLoading}
				onInteractOutside={(e) => {
					e.preventDefault()
				}}
				className={clsx(
					className,
					'flex max-h-screen flex-col overflow-y-auto rounded-lg',
				)}>
				{/* Title */}
				<DialogHeader>
					{customHeader !== null ? (
						<DialogTitle>{customHeader}</DialogTitle>
					) : (
						<DialogTitle>{title}</DialogTitle>
					)}
				</DialogHeader>

				{/* Body */}
				{children}

				{/* Actions */}
				{showActions ? (
					<DialogFooter>
						{showCancelButton && <DialogCloseButton variant={loading ? 'ghost' : cancelButtonVariant}></DialogCloseButton>}
						<Button
							onClick={onConfirm}
							variant={loading ? 'ghost' : actionButtonVariant}
							disabled={disabled || loading}
							ref={targetAcceptButtonRef}>
							<Icons.Misc.Check className="mr-2" />
							{loading ? <ClipLoader /> : actionText}
						</Button>
					</DialogFooter>
				) : (
					<></>
				)}
			</DialogContent>
		</Dialog>
	)
}

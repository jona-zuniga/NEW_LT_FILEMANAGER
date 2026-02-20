import {Dialog} from '../ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import {createContext, forwardRef, useContext, useState} from 'react'

import {useDialog} from '@/hooks/useDialog'

import {cn} from '@/lib/utils'

const ImageViewerContext = createContext({
	isOpen: false,
	src: null,
	openImage: (src) => src,
	closeImage: () => null,
})

const DialogContentImageViewer = forwardRef(
	({className, staticMode = true, children, ...props}, ref) => (
		<DialogPrimitive.DialogPortal>
			<DialogPrimitive.DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed left-0 top-0 z-50 grid h-full w-full gap-4 rounded-md border border-black bg-black p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ',
					className,
				)}
				onInteractOutside={(e) => staticMode && e.preventDefault()}
				{...props}>
				<DialogPrimitive.Close className="absolute right-4 top-4 rounded-xs opacity-70 outline-hidden ring-offset-white transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 ">
					<X className="h-4 w-4 text-white" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
				<DialogPrimitive.Close>
					<div className="h-screen w-screen items-center justify-center">{children}</div>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.DialogPortal>
	),
)

DialogContentImageViewer.displayName = 'LtDialogContentImageViewer'

export const ImageViewerProvider = ({children}) => {
	const openSetImageViewer = useDialog()
	const [src, setSrc] = useState(null)

	const openImage = (src) => {
		setSrc(src)
		openSetImageViewer.on()
	}

	const closeImage = () => {
		openSetImageViewer.off()
	}

	return (
		<ImageViewerContext.Provider
			value={{
				isOpen: openSetImageViewer.show,
				src,
				openImage,
				closeImage,
			}}>
			{openSetImageViewer.show && (
				<Dialog openSet={openSetImageViewer}>
					<DialogContentImageViewer>
						<img
							src={src}
							alt="Full View"
							className="m-auto h-full max-w-full object-contain"
						/>
					</DialogContentImageViewer>
				</Dialog>
			)}
			{children}
		</ImageViewerContext.Provider>
	)
}

const useImageViewer = () => useContext(ImageViewerContext)

const LtImageViewer = ({src, children}) => {
	const {openImage} = useImageViewer()

	return (
		<div>
			<div className="cursor-pointer" onClick={() => openImage(src)}>
				{children}
			</div>
		</div>
	)
}

export default LtImageViewer

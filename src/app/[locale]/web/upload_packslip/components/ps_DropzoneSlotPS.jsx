'use client'

import Icons from '@/components/utils/Icons'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const ACCEPT = {
	'application/pdf': ['.pdf'],
	'image/png':       ['.png'],
	'image/jpeg':      ['.jpg', '.jpeg'],
	'image/webp':      ['.webp'],
}

export default function DropzoneSlotPS({onDrop, disabled = false}) {
	const handleDrop = useCallback(
		(accepted) => {
			if (disabled || !accepted.length) return
			onDrop?.(accepted)
		},
		[onDrop, disabled],
	)

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop:   handleDrop,
		accept:   ACCEPT,
		disabled,
		multiple: true,
	})

	return (
		<div
			{...getRootProps()}
			className={`
				flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-2
				rounded-xl border-2 border-dashed transition-all duration-200 md:h-28
				${disabled
					? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-50 dark:border-slate-700 dark:bg-slate-800'
					: isDragActive
						? 'border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/30'
						: 'border-amber-300 bg-amber-50/50 hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/10 dark:hover:border-amber-600'
				}
			`}
		>
			<input {...getInputProps()} />
			<div className={`
				flex h-9 w-9 items-center justify-center rounded-xl transition-all
				${isDragActive
					? 'bg-amber-200 dark:bg-amber-800'
					: 'bg-amber-100 dark:bg-amber-900/40'
				}
			`}>
				<Icons.FileManager.LuPackage
					size={18}
					className={isDragActive ? 'animate-bounce text-amber-600' : 'text-amber-500'}
				/>
			</div>
			<div className="text-center">
				<p className={`text-xs font-semibold ${isDragActive ? 'text-amber-600' : 'text-amber-500'}`}>
					packing slip
				</p>
				<p className="text-[10px] text-slate-400">Drag & drop files here</p>
			</div>
		</div>
	)
}

'use client'

import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {LuCircleX, LuUpload} from 'react-icons/lu'

import {useT} from '@/components/providers/I81nProvider'
import Icons from '@/components/utils/Icons'

export default function DropzoneSlotMulti({slotKey = 'invoice', onDrop, disabled = false}) {
	const t = useT()
	const SLOT_CONFIG = {
		invoice: {
			label: t('invoice'),
			sub: 'PNG · JPG · PDF',
			Icon: Icons.FileManager.LuReceiptText,
			border: 'border-cyan-300 dark:border-cyan-700',
			bg: 'bg-cyan-50 dark:bg-cyan-950',
			hover: 'hover:border-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-900',
			dragAccept: 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900',
			iconBg: 'bg-cyan-100 dark:bg-cyan-900',
			iconColor: 'text-cyan-600 dark:text-cyan-400',
			labelColor: 'text-cyan-700 dark:text-cyan-300',
		},
		other: {
			label: t('other'),
			sub: 'PNG · JPG · PDF',
			Icon: Icons.FileManager.LuFile,
			border: 'border-violet-300 dark:border-violet-700',
			bg: 'bg-violet-50 dark:bg-violet-950',
			hover: 'hover:border-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900',
			dragAccept: 'border-violet-500 bg-violet-100 dark:bg-violet-900',
			iconBg: 'bg-violet-100 dark:bg-violet-900',
			iconColor: 'text-violet-600 dark:text-violet-400',
			labelColor: 'text-violet-700 dark:text-violet-300',
		},
	}

	const ACCEPTED_TYPES = {
		'image/png': [],
		'image/jpeg': [],
		'image/webp': [],
		'application/pdf': [],
	}
	const cfg = SLOT_CONFIG[slotKey] ?? SLOT_CONFIG.other

	const [showReject, setShowReject] = useState(false)

	const handleDrop = useCallback(
		(acceptedFiles) => {
			if (!acceptedFiles?.length) return
			onDrop?.(slotKey, acceptedFiles)
		},
		[slotKey, onDrop],
	)

	const {getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone({
		onDrop: handleDrop,
		accept: ACCEPTED_TYPES,
		multiple: slotKey !== 'invoice',
		maxFiles: slotKey === 'invoice' ? 1 : undefined,
		disabled,
	})

	useEffect(() => {
		if (!isDragReject) return
		setShowReject(true)
		const t = setTimeout(() => setShowReject(false), 600)
		return () => clearTimeout(t)
	}, [isDragReject])

	const renderIcon = () => {
		if (showReject) return <LuCircleX size={24} className="animate-bounce text-red-500" />
		if (isDragAccept)
			return <LuUpload size={24} className={`animate-bounce ${cfg.iconColor}`} />
		return <cfg.Icon size={24} className={cfg.iconColor} />
	}

	return (
		<div
			{...getRootProps()}
			className={`/* Altura: más pequeño en móvil, más grande en escritorio */ relative flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center transition-all duration-200 select-none md:h-28 ${
				disabled
					? 'pointer-events-none cursor-not-allowed border-slate-200 bg-slate-100 opacity-50 dark:border-slate-700 dark:bg-slate-800'
					: isDragAccept
						? `${cfg.dragAccept} border-solid`
						: showReject
							? 'border-red-400 bg-red-50 dark:bg-red-950'
							: `${cfg.border} ${cfg.bg} ${cfg.hover}`
			} `}>
			<input {...getInputProps()} />

			<div className={`flex h-9 w-9 items-center justify-center rounded-xl ${cfg.iconBg}`}>
				{renderIcon()}
			</div>

			<div className="flex flex-col gap-0.5 px-1">
				<p className={`text-xs font-bold ${showReject ? 'text-red-500' : cfg.labelColor}`}>
					{showReject ? 'Not accepted' : isDragAccept ? 'Drop here!' : cfg.label}
				</p>
				{!showReject && !isDragAccept && (
					<p className="hidden text-[10px] text-slate-400 md:block">{cfg.sub}</p>
				)}
			</div>
		</div>
	)
}

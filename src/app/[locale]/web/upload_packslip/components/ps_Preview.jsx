'use client'

import {useEffect, useState} from 'react'
import {LuDatabaseZap, LuDownload, LuEye, LuLoader} from 'react-icons/lu'

function PreviewEmpty() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-amber-200 bg-amber-50/30 dark:border-amber-900 dark:bg-amber-950/10">
			<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/40">
				<LuDatabaseZap size={26} className="text-amber-400 dark:text-amber-600" />
			</div>
			<div className="px-4 text-center">
				<p className="text-sm font-medium text-slate-500 dark:text-slate-400">
					Select file to preview
				</p>
				<p className="text-xs text-slate-400 dark:text-slate-500">
					PDF and images supported
				</p>
			</div>
		</div>
	)
}

function PreviewToolbar({fileName, onDownload}) {
	return (
		<div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5">
			<div className="flex min-w-0 items-center gap-2">
				<LuEye size={13} className="shrink-0 text-white/40" />
				<span className="truncate font-mono text-xs text-white/60">{fileName}</span>
			</div>
			<button
				onClick={onDownload}
				className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
				<LuDownload size={13} />
			</button>
		</div>
	)
}

export default function PreviewPS({selectedFile}) {
	const name = selectedFile?.name
	const file = selectedFile?.file
	const img = selectedFile?.img
	const viewUrl = selectedFile?.viewUrl

	const ext = name?.split('.').pop()?.toLowerCase()
	const isPdf = ext === 'pdf'
	const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext ?? '')
	const src = viewUrl || img || (file ? URL.createObjectURL(file) : null)

	const [blobUrl, setBlobUrl] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!isPdf || !src) {
			setBlobUrl(null)
			return
		}
		let objectUrl = null

		if (src.startsWith('blob:')) {
			setBlobUrl(src)
			return
		}

		setLoading(true)
		fetch(src)
			.then((res) => res.blob())
			.then((blob) => {
				objectUrl = URL.createObjectURL(blob)
				setBlobUrl(objectUrl)
			})
			.catch((err) => console.error('PDF load error:', err))
			.finally(() => setLoading(false))

		return () => {
			if (objectUrl) URL.revokeObjectURL(objectUrl)
		}
	}, [src, isPdf])

	const handleDownload = () => {
		if (!src) return
		const a = document.createElement('a')
		a.href = src
		a.download = name
		a.click()
	}

	if (!selectedFile) return <PreviewEmpty />

	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
			<PreviewToolbar fileName={name} onDownload={handleDownload} />
			<div className="flex w-full flex-1 items-center justify-center overflow-auto bg-slate-800 p-3 md:p-6">
				{isPdf &&
					(loading ? (
						<div className="flex flex-col items-center gap-3 text-white/40">
							<LuLoader size={28} className="animate-spin" />
							<p className="text-xs">Loading PDF...</p>
						</div>
					) : (
						blobUrl && (
							<iframe
								src={`${blobUrl}#toolbar=0&navpanes=0`}
								title={name}
								className="h-full w-full rounded shadow-2xl"
								style={{minHeight: '300px'}}
							/>
						)
					))}
				{isImage && src && (
					<img
						src={src}
						alt={name}
						className="max-h-full max-w-full rounded object-contain shadow-2xl"
					/>
				)}
				{!isPdf && !isImage && (
					<div className="flex flex-col items-center gap-3 text-white/40">
						<LuDatabaseZap size={36} />
						<p className="text-center text-sm">Preview not available</p>
					</div>
				)}
			</div>
		</div>
	)
}

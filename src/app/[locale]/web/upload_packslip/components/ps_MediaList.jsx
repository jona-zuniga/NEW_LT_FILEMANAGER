'use client'

import {useUploadPackslipState} from '../_state/ps_uploadPackslip.state'
import {useState} from 'react'
import {
	LuCheck,
	LuDatabaseZap,
	LuFile,
	LuFileImage,
	LuPencil,
	LuReceiptText,
	LuTrash2,
	LuX,
} from 'react-icons/lu'

function FileIcon({name}) {
	const ext = name?.split('.').pop()?.toLowerCase()
	if (['png', 'jpg', 'jpeg', 'webp'].includes(ext))
		return <LuFileImage size={15} className="text-slate-500 dark:text-slate-400" />
	if (ext === 'pdf')
		return <LuReceiptText size={15} className="text-slate-500 dark:text-slate-400" />
	return <LuFile size={15} className="text-slate-500 dark:text-slate-400" />
}

function formatSize(bytes) {
	if (!bytes) return '—'
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileRow({file, isActive, onSelect, onDelete}) {
	const {update, files} = useUploadPackslipState((s) => s)

	const [editing, setEditing] = useState(false)
	const [draft, setDraft] = useState('')

	const startEdit = (e) => {
		e.stopPropagation()
		const ext = file.name.split('.').pop()
		const base = (file.customName ?? file.name).replace(`.${ext}`, '')
		setDraft(base)
		setEditing(true)
	}

	const confirmEdit = (e) => {
		e?.stopPropagation()
		if (!draft.trim()) {
			cancelEdit()
			return
		}
		const ext = file.name.split('.').pop()
		const newName = `${draft.trim()}.${ext}`
		const updatedFiles = files.map((f) => (f.id === file.id ? {...f, customName: newName} : f))
		update({files: updatedFiles})
		setEditing(false)
	}

	const cancelEdit = (e) => {
		e?.stopPropagation()
		setEditing(false)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') confirmEdit()
		if (e.key === 'Escape') cancelEdit()
	}

	return (
		<div
			onClick={() => !editing && onSelect?.(file)}
			className={`group flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 transition-all duration-150 ${
				isActive
					? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950'
					: 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
			} `}>
			<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-700">
				<FileIcon name={file.name} />
			</div>

			<div className="min-w-0 flex-1">
				{editing ? (
					<div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
						<input
							autoFocus
							value={draft}
							onChange={(e) => setDraft(e.target.value)}
							onKeyDown={handleKeyDown}
							className="w-full rounded border border-amber-400 bg-white px-1.5 py-0.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-amber-400/30 dark:bg-slate-700 dark:text-slate-100"
						/>
						<button
							onClick={confirmEdit}
							className="flex-shrink-0 rounded p-0.5 text-emerald-500 hover:bg-emerald-50">
							<LuCheck size={13} />
						</button>
						<button
							onClick={cancelEdit}
							className="flex-shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100">
							<LuX size={13} />
						</button>
					</div>
				) : (
					<>
						<p className="truncate text-xs font-medium text-slate-800 dark:text-slate-100">
							{file.customName ?? file.name}
						</p>
						<p className="font-mono text-[10px] text-slate-400">
							{formatSize(file.size)}
						</p>
					</>
				)}
			</div>

			{!editing && (
				<span className="hidden flex-shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 sm:block dark:bg-amber-900 dark:text-amber-300">
					pack slip
				</span>
			)}

			{!editing && file.isNew !== false && (
				<div className="flex flex-shrink-0 items-center gap-1 md:opacity-0 md:group-hover:opacity-100">
					<button
						onClick={startEdit}
						className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-950 dark:hover:text-amber-400">
						<LuPencil size={12} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							onDelete?.(file.id)
						}}
						className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500">
						<LuTrash2 size={13} />
					</button>
				</div>
			)}
		</div>
	)
}

export default function MediaListPS({files = [], activeFileId, onSelect, onDelete}) {
	if (!files.length) {
		return (
			<div className="flex flex-col gap-1.5">
				<SectionLabel count={0} />
				<div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-6 dark:border-slate-700">
					<LuDatabaseZap size={22} className="text-slate-300 dark:text-slate-600" />
					<p className="text-xs text-slate-400">No files</p>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-1.5">
			<SectionLabel count={files.length} />
			<div className="flex max-h-40 flex-col gap-1.5 overflow-y-auto pr-0.5 md:max-h-56 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-track]:bg-transparent">
				{files.map((file) => (
					<FileRow
						key={file.id}
						file={file}
						isActive={file.id === activeFileId}
						onSelect={onSelect}
						onDelete={onDelete}
					/>
				))}
			</div>
		</div>
	)
}

function SectionLabel({count}) {
	return (
		<div className="flex items-center justify-between">
			<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
				Uploaded files
			</p>
			{count > 0 && (
				<span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-900 dark:text-amber-300">
					{count}
				</span>
			)}
		</div>
	)
}

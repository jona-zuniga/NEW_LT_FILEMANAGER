'use client'

import {useUploadFileState} from '../_state/uploadinvoice.state'
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

const TYPE_CONFIG = {
	invoice: {
		tagBg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
		activeBg: 'border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950',
	},
	packing_slip: {
		tagBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
		activeBg: 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950',
	},
	other: {
		tagBg: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
		activeBg: 'border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-950',
	},
}

function FileIcon({name}) {
	const ext = name?.split('.').pop()?.toLowerCase()
	if (['png', 'jpg', 'jpeg', 'webp'].includes(ext))
		return <LuFileImage size={15} className="text-slate-500 dark:text-slate-400" />
	if (ext === 'pdf')
		return <LuReceiptText size={15} className="text-slate-500 dark:text-slate-400" />
	return <LuFile size={15} className="text-slate-500 dark:text-slate-400" />
}

function SkeletonRow() {
	return (
		<div className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800">
			<div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
			<div className="flex flex-1 flex-col gap-1.5">
				<div className="h-2.5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
				<div className="h-2 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
			</div>
		</div>
	)
}

function formatSize(bytes) {
	if (!bytes) return '—'
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileRow({file, isActive, onSelect, onDelete}) {
	const {update, files} = useUploadFileState((s) => s)
	const cfg = TYPE_CONFIG[file.slotKey] ?? TYPE_CONFIG.other
	const isExisting = file.isNew === false // ← viene de BD, sin botones

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
					? cfg.activeBg
					: 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
			} `}>
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-700">
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
							className="w-full rounded border border-cyan-400 bg-white px-1.5 py-0.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-cyan-400/30 dark:bg-slate-700 dark:text-slate-100"
						/>
						<button
							onClick={confirmEdit}
							className="shrink-0 rounded p-0.5 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950">
							<LuCheck size={13} />
						</button>
						<button
							onClick={cancelEdit}
							className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
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
				<span
					className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:block ${cfg.tagBg}`}>
					{file.slotKey}
				</span>
			)}

			{!editing && !isExisting && (
				<div className="flex shrink-0 items-center gap-1 md:opacity-0 md:group-hover:opacity-100">
					<button
						onClick={startEdit}
						title="Rename"
						className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-cyan-100 hover:text-cyan-600 dark:hover:bg-cyan-950 dark:hover:text-cyan-400">
						<LuPencil size={12} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							onDelete?.(file.id)
						}}
						title="Delete"
						className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950 dark:hover:text-red-400">
						<LuTrash2 size={13} />
					</button>
				</div>
			)}
		</div>
	)
}

export default function MediaList({files = [], activeFileId, onSelect, onDelete, loading = false}) {
	if (loading) {
		return (
			<div className="flex flex-col gap-1.5">
				<SectionLabel count={0} />
				{[1, 2, 3].map((i) => (
					<SkeletonRow key={i} />
				))}
			</div>
		)
	}

	if (!files.length) {
		return (
			<div className="flex flex-col gap-1.5">
				<SectionLabel count={0} />
				<div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-6 dark:border-slate-700">
					<LuDatabaseZap size={24} className="text-slate-300 dark:text-slate-600" />
					<p className="text-xs text-slate-400">No files yet</p>
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
				<span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
					{count}
				</span>
			)}
		</div>
	)
}

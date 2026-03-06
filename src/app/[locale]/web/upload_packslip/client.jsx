// 'use client'
// import {useUploadPackslipState} from './_state/ps_uploadPackslip.state'
// import DropzoneSlotPS from './components/ps_DropzoneSlotPS'
// import FormularioPackslip from './components/ps_FormularioPackslip'
// import MediaListPS from './components/ps_MediaList'
// import PreviewPS from './components/ps_Preview'
// import StepperBarPS from './components/ps_StepperBar'
// import {useMutation, useQuery} from '@tanstack/react-query'
// import {LucideAlertTriangle, LucideLayoutList} from 'lucide-react'
// import {useState} from 'react'
// import {LuEye, LuSave} from 'react-icons/lu'
// import getVendors from '@/helpers/queries/filemanager/getVendors'
// import {__upload_packslip} from '@/services/upload_packslip.service'
// import {validatePackslip} from '@/validators/uploadFileSchema_Upackslip'
// export default function ClientPackslip() {
// 	const {files, selectedFile, addFiles, removeFile, update, reset} = useUploadPackslipState(
// 		(state) => state,
// 	)
// 	const getVendorsQuery = useQuery({
// 		queryFn: () => getVendors(),
// 		queryKey: ['packslipVendors'],
// 	})
// 	const [mobileTab, setMobileTab] = useState('form')
// 	const [existingFiles, setExistingFiles] = useState([])
// 	const hasExisting = existingFiles.length > 0
// 	const hasNewFiles = files.some((f) => f.isNew)
// 	const mut = useMutation({
// 		mutationFn: __upload_packslip.post,
// 		onSuccess: () => {
// 			reset()
// 			setExistingFiles([])
// 		},
// 		onSettled: () => {
// 			console.log('Settled')
// 		},
// 	})
// 	const currentStep = files.length === 0 ? 1 : mut.isPending ? 3 : 2
// 	const handleExistingFound = (found) => {
// 		setExistingFiles(found)
// 		if (found.length > 0) {
// 			update({selectedFile: found[0]})
// 			setMobileTab('preview')
// 		}
// 	}
// 	const handleDrop = (acceptedFiles) => {
// 		const newFiles = acceptedFiles.map((file) => ({
// 			id: crypto.randomUUID(),
// 			file,
// 			name: file.name,
// 			customName: file.name,
// 			size: file.size,
// 			slotKey: 'packing_slip',
// 			isNew: true,
// 			img: URL.createObjectURL(file),
// 		}))
// 		addFiles(newFiles)
// 		update({selectedFile: newFiles[0]})
// 		setMobileTab('preview')
// 	}
// 	const handleDelete = (id) => removeFile(id)
// 	const handleSave = () => {
// 		const {item, files} = useUploadPackslipState.getState()
// 		const newFiles = files.filter((f) => f.isNew)
// 		const {isValid, errors} = validatePackslip(item, newFiles)
// 		if (!isValid) {
// 			useUploadPackslipState.setState({errorsFlatMap: errors})
// 			console.error(errors)
// 			return
// 		}
// 		mut.mutate({item, files: newFiles})
// 	}
// 	const allFiles = [...existingFiles.map((f) => ({...f, isNew: false})), ...files]
// 	const LeftPanel = (
// 		<div className="flex flex-col gap-4">
// 			<div className="flex flex-col gap-2">
// 				<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
// 					Upload documents
// 				</p>
// 				<DropzoneSlotPS onDrop={handleDrop} disabled={hasExisting} />
// 			</div>
// 			<div className="h-px bg-slate-100 dark:bg-slate-700" />
// 			<MediaListPS
// 				files={allFiles}
// 				activeFileId={selectedFile?.id}
// 				onSelect={(file) => {
// 					update({selectedFile: file})
// 					setMobileTab('preview')
// 				}}
// 				onDelete={handleDelete}
// 			/>
// 			<div className="h-px bg-slate-100 dark:bg-slate-700" />
// 			<FormularioPackslip vendors={getVendorsQuery} onExistingFound={handleExistingFound} />
// 		</div>
// 	)
// 	return (
// 		<div className="flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
// 			<header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
// 				<div className="flex items-center gap-2">
// 					<h1 className="text-sm font-bold tracking-tight text-slate-800 md:text-base dark:text-white">
// 						Upload packing slip
// 					</h1>
// 					{hasExisting && (
// 						<span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
// 							<LucideAlertTriangle size={10} />
// 							Already exists
// 						</span>
// 					)}
// 				</div>
// 				<div className="flex items-center gap-2">
// 					<button
// 						onClick={() => {
// 							reset()
// 							setExistingFiles([])
// 						}}
// 						className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition-all hover:bg-slate-50 md:px-4 md:text-sm dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
// 						Cancel
// 					</button>
// 					<button
// 						onClick={handleSave}
// 						disabled={!hasNewFiles || hasExisting || mut.isPending}
// 						className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:text-sm">
// 						{mut.isPending ? (
// 							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
// 						) : (
// 							<LuSave size={13} />
// 						)}
// 						{mut.isPending ? 'Saving...' : 'Save'}
// 					</button>
// 				</div>
// 			</header>
// 			<div className="border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
// 				<StepperBarPS currentStep={currentStep} />
// 			</div>
// 			<div className="flex border-b border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800">
// 				<button
// 					onClick={() => setMobileTab('form')}
// 					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
// 						mobileTab === 'form'
// 							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
// 							: 'text-slate-400'
// 					}`}>
// 					<LucideLayoutList size={14} />
// 					Form
// 				</button>
// 				<button
// 					onClick={() => setMobileTab('preview')}
// 					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
// 						mobileTab === 'preview'
// 							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
// 							: 'text-slate-400'
// 					}`}>
// 					<LuEye size={14} />
// 					Preview
// 					{selectedFile && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
// 				</button>
// 			</div>
// 			<div className="flex flex-1 overflow-hidden">
// 				<div className="flex flex-1 overflow-hidden md:hidden">
// 					{mobileTab === 'form' && (
// 						<div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-slate-800">
// 							{LeftPanel}
// 						</div>
// 					)}
// 					{mobileTab === 'preview' && (
// 						<div className="flex flex-1 overflow-hidden p-3">
// 							<PreviewPS selectedFile={selectedFile} />
// 						</div>
// 					)}
// 				</div>
// 				<div className="hidden flex-1 overflow-hidden md:flex">
// 					<aside className="w-96 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
// 						{LeftPanel}
// 					</aside>
// 					<main className="flex flex-1 overflow-hidden p-2">
// 						<PreviewPS selectedFile={selectedFile} />
// 					</main>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
'use client'

import {useUploadPackslipState} from './_state/ps_uploadPackslip.state'
import DropzoneSlotPS from './components/ps_DropzoneSlotPS'
import FormularioPackslip from './components/ps_FormularioPackslip'
import MediaListPS from './components/ps_MediaList'
import PreviewPS from './components/ps_Preview'
import StepperBarPS from './components/ps_StepperBar'
import {useMutation, useQuery} from '@tanstack/react-query'
import {LucideAlertTriangle, LucideLayoutList} from 'lucide-react'
import {useState} from 'react'
import {LuEye, LuSave} from 'react-icons/lu'

import getVendors from '@/helpers/queries/filemanager/getVendors'

import {__upload_packslip} from '@/services/upload_packslip.service'

import {validatePackslip} from '@/validators/uploadFileSchema_Upackslip'

// 'use client'

// import {useUploadPackslipState} from './_state/ps_uploadPackslip.state'
// import DropzoneSlotPS from './components/ps_DropzoneSlotPS'
// import FormularioPackslip from './components/ps_FormularioPackslip'
// import MediaListPS from './components/ps_MediaList'
// import PreviewPS from './components/ps_Preview'
// import StepperBarPS from './components/ps_StepperBar'
// import {useMutation, useQuery} from '@tanstack/react-query'
// import {LucideAlertTriangle, LucideLayoutList} from 'lucide-react'
// import {useState} from 'react'
// import {LuEye, LuSave} from 'react-icons/lu'

// import getVendors from '@/helpers/queries/filemanager/getVendors'

// import {__upload_packslip} from '@/services/upload_packslip.service'

// import {validatePackslip} from '@/validators/uploadFileSchema_Upackslip'

// export default function ClientPackslip() {
// 	const {files, selectedFile, addFiles, removeFile, update, reset} = useUploadPackslipState(
// 		(state) => state,
// 	)

// 	const getVendorsQuery = useQuery({
// 		queryFn: () => getVendors(),
// 		queryKey: ['packslipVendors'],
// 	})

// 	const [mobileTab, setMobileTab] = useState('form')
// 	const [existingFiles, setExistingFiles] = useState([])

// 	const hasExisting = existingFiles.length > 0
// 	const hasNewFiles = files.some((f) => f.isNew)

// 	const mut = useMutation({
// 		mutationFn: __upload_packslip.post,
// 		onSuccess: () => {
// 			reset()
// 			setExistingFiles([])
// 		},
// 		onSettled: () => {
// 			console.log('Settled')
// 		},
// 	})

// 	const currentStep = files.length === 0 ? 1 : mut.isPending ? 3 : 2

// 	const handleExistingFound = (found) => {
// 		setExistingFiles(found)
// 		if (found.length > 0) {
// 			update({selectedFile: found[0]})
// 			setMobileTab('preview')
// 		}
// 	}

// 	const handleDrop = (acceptedFiles) => {
// 		const newFiles = acceptedFiles.map((file) => ({
// 			id: crypto.randomUUID(),
// 			file,
// 			name: file.name,
// 			customName: file.name,
// 			size: file.size,
// 			slotKey: 'packing_slip',
// 			isNew: true,
// 			img: URL.createObjectURL(file),
// 		}))
// 		addFiles(newFiles)
// 		update({selectedFile: newFiles[0]})
// 		setMobileTab('preview')
// 	}

// 	const handleDelete = (id) => removeFile(id)

// 	const handleSave = () => {
// 		const {item, files} = useUploadPackslipState.getState()
// 		const newFiles = files.filter((f) => f.isNew)

// 		const {isValid, errors} = validatePackslip(item, newFiles)
// 		if (!isValid) {
// 			useUploadPackslipState.setState({errorsFlatMap: errors})
// 			console.error(errors)
// 			return
// 		}

// 		mut.mutate({item, files: newFiles})
// 	}

// 	const allFiles = [...existingFiles.map((f) => ({...f, isNew: false})), ...files]

// 	const LeftPanel = (
// 		<div className="flex flex-col gap-4">
// 			<div className="flex flex-col gap-2">
// 				<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
// 					Upload documents
// 				</p>
// 				<DropzoneSlotPS onDrop={handleDrop} disabled={hasExisting} />
// 			</div>

// 			<div className="h-px bg-slate-100 dark:bg-slate-700" />

// 			<MediaListPS
// 				files={allFiles}
// 				activeFileId={selectedFile?.id}
// 				onSelect={(file) => {
// 					update({selectedFile: file})
// 					setMobileTab('preview')
// 				}}
// 				onDelete={handleDelete}
// 			/>

// 			<div className="h-px bg-slate-100 dark:bg-slate-700" />

// 			<FormularioPackslip vendors={getVendorsQuery} onExistingFound={handleExistingFound} />
// 		</div>
// 	)

// 	return (
// 		<div className="flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
// 			<header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
// 				<div className="flex items-center gap-2">
// 					<h1 className="text-sm font-bold tracking-tight text-slate-800 md:text-base dark:text-white">
// 						Upload packing slip
// 					</h1>
// 					{hasExisting && (
// 						<span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
// 							<LucideAlertTriangle size={10} />
// 							Already exists
// 						</span>
// 					)}
// 				</div>
// 				<div className="flex items-center gap-2">
// 					<button
// 						onClick={() => {
// 							reset()
// 							setExistingFiles([])
// 						}}
// 						className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition-all hover:bg-slate-50 md:px-4 md:text-sm dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
// 						Cancel
// 					</button>
// 					<button
// 						onClick={handleSave}
// 						disabled={!hasNewFiles || hasExisting || mut.isPending}
// 						className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:text-sm">
// 						{mut.isPending ? (
// 							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
// 						) : (
// 							<LuSave size={13} />
// 						)}
// 						{mut.isPending ? 'Saving...' : 'Save'}
// 					</button>
// 				</div>
// 			</header>

// 			<div className="border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
// 				<StepperBarPS currentStep={currentStep} />
// 			</div>

// 			<div className="flex border-b border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800">
// 				<button
// 					onClick={() => setMobileTab('form')}
// 					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
// 						mobileTab === 'form'
// 							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
// 							: 'text-slate-400'
// 					}`}>
// 					<LucideLayoutList size={14} />
// 					Form
// 				</button>
// 				<button
// 					onClick={() => setMobileTab('preview')}
// 					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
// 						mobileTab === 'preview'
// 							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
// 							: 'text-slate-400'
// 					}`}>
// 					<LuEye size={14} />
// 					Preview
// 					{selectedFile && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
// 				</button>
// 			</div>

// 			<div className="flex flex-1 overflow-hidden">
// 				<div className="flex flex-1 overflow-hidden md:hidden">
// 					{mobileTab === 'form' && (
// 						<div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-slate-800">
// 							{LeftPanel}
// 						</div>
// 					)}
// 					{mobileTab === 'preview' && (
// 						<div className="flex flex-1 overflow-hidden p-3">
// 							<PreviewPS selectedFile={selectedFile} />
// 						</div>
// 					)}
// 				</div>

// 				<div className="hidden flex-1 overflow-hidden md:flex">
// 					<aside className="w-96 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
// 						{LeftPanel}
// 					</aside>
// 					<main className="flex flex-1 overflow-hidden p-2">
// 						<PreviewPS selectedFile={selectedFile} />
// 					</main>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

export default function ClientPackslip() {
	const {files, selectedFile, addFiles, removeFile, update, reset} = useUploadPackslipState(
		(state) => state,
	)

	const getVendorsQuery = useQuery({
		queryFn: () => getVendors(),
		queryKey: ['packslipVendors'],
	})

	const [mobileTab, setMobileTab] = useState('form')
	const [existingFiles, setExistingFiles] = useState([])

	const hasExisting = existingFiles.length > 0
	const hasNewFiles = files.some((f) => f.isNew)

	const mut = useMutation({
		mutationFn: __upload_packslip.post,
		onSuccess: () => {
			reset()
			setExistingFiles([])
		},
		onSettled: () => {
			console.log('Settled')
		},
	})

	const currentStep = files.length === 0 ? 1 : mut.isPending ? 3 : 2

	// Igual que invoice — recibe archivos de BD y los muestra
	const handleExistingFound = (found) => {
		setExistingFiles(found)
		if (found.length > 0) {
			update({selectedFile: found[0]})
			setMobileTab('preview')
		}
	}

	const handleDrop = (acceptedFiles) => {
		const newFiles = acceptedFiles.map((file) => ({
			id: crypto.randomUUID(),
			file,
			name: file.name,
			customName: file.name,
			size: file.size,
			slotKey: 'packing_slip',
			isNew: true,
			img: URL.createObjectURL(file),
		}))
		addFiles(newFiles)
		update({selectedFile: newFiles[0]})
		setMobileTab('preview')
	}

	const handleDelete = (id) => removeFile(id)

	const handleSave = () => {
		const {item, files} = useUploadPackslipState.getState()
		const newFiles = files.filter((f) => f.isNew)

		const {isValid, errors} = validatePackslip(item, newFiles)
		if (!isValid) {
			useUploadPackslipState.setState({errorsFlatMap: errors})
			console.error(errors)
			return
		}

		mut.mutate({item, files: newFiles})
	}

	// Existentes primero (isNew:false, sin botones) + nuevos después (isNew:true, con botones)
	const allFiles = [...existingFiles.map((f) => ({...f, isNew: false})), ...files]

	const LeftPanel = (
		<div className="flex flex-col gap-4">
			{/* Stepper al ancho del aside — igual que invoice */}
			<StepperBarPS currentStep={currentStep} />

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			{/* Dropzone — deshabilitado si hay existentes */}
			<div className="flex flex-col gap-2">
				<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
					Upload documents
				</p>
				<DropzoneSlotPS onDrop={handleDrop} disabled={hasExisting} />
			</div>

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			{/* Lista — existentes (solo click) + nuevos (con botones) */}
			<MediaListPS
				files={allFiles}
				activeFileId={selectedFile?.id}
				onSelect={(file) => {
					update({selectedFile: file})
					setMobileTab('preview')
				}}
				onDelete={handleDelete}
			/>

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			{/* Formulario con useCheckPackslip — dispara handleExistingFound */}
			<FormularioPackslip vendors={getVendorsQuery} onExistingFound={handleExistingFound} />
		</div>
	)

	return (
		<div className="flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
			{/* ── Header ── */}
			<header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
				<div className="flex items-center gap-2">
					<h1 className="text-sm font-bold tracking-tight text-slate-800 md:text-base dark:text-white">
						Upload packing slip
					</h1>
					{hasExisting && (
						<span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
							<LucideAlertTriangle size={10} />
							Already exists
						</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => {
							reset()
							setExistingFiles([])
						}}
						className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition-all hover:bg-slate-50 md:px-4 md:text-sm dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700">
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={!hasNewFiles || hasExisting || mut.isPending}
						className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:text-sm">
						{mut.isPending ? (
							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
						) : (
							<LuSave size={13} />
						)}
						{mut.isPending ? 'Saving...' : 'Save'}
					</button>
				</div>
			</header>

			{/* ── Tabs móvil ── */}
			<div className="flex border-b border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800">
				<button
					onClick={() => setMobileTab('form')}
					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
						mobileTab === 'form'
							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
							: 'text-slate-400'
					}`}>
					<LucideLayoutList size={14} />
					Form
				</button>
				<button
					onClick={() => setMobileTab('preview')}
					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
						mobileTab === 'preview'
							? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400'
							: 'text-slate-400'
					}`}>
					<LuEye size={14} />
					Preview
					{selectedFile && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
				</button>
			</div>

			{/* ── Contenido ── */}
			<div className="flex flex-1 overflow-hidden">
				{/* Móvil */}
				<div className="flex flex-1 overflow-hidden md:hidden">
					{mobileTab === 'form' && (
						<div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-slate-800">
							{LeftPanel}
						</div>
					)}
					{mobileTab === 'preview' && (
						<div className="flex flex-1 overflow-hidden p-3">
							<PreviewPS selectedFile={selectedFile} />
						</div>
					)}
				</div>

				{/* Desktop — aside con stepper + preview full height */}
				<div className="hidden flex-1 overflow-hidden md:flex">
					<aside className="w-96 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						{LeftPanel}
					</aside>
					<main className="flex flex-1 overflow-hidden p-2">
						<PreviewPS selectedFile={selectedFile} />
					</main>
				</div>
			</div>
		</div>
	)
}

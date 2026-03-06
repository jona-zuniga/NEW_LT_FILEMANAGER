'use client'

import {useUploadFileState} from './_state/uploadinvoice.state'
import DropzoneSlotMulti from './components/DropzoneSlotMulti'
import FormularioInicio from './components/FormularioInicio'
import MediaList from './components/MediaList'
import Preview from './components/Preview'
import StepperBar from './components/StepperBar'
import {useMutation, useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {LucideAlertTriangle} from 'lucide-react'
import {useState} from 'react'
import {LuEye, LuLayoutList, LuSave} from 'react-icons/lu'

import {useT} from '@/components/providers/I81nProvider'

import getVendors from '@/helpers/queries/filemanager/getVendors'

import {__upload_invoice} from '@/services/upload_invoice.service'

import {validateInvoice} from '@/validators/uploadFileSchema_Uinvoice'

export default function ClientInvoice() {
	const t = useT()

	const {files, selectedFile, addFilesToSlot, removeFile, update, reset} = useUploadFileState(
		(state) => state,
	)

	const getVendorsQuery = useQuery({
		queryFn: () => getVendors(),
		queryKey: ['uploadInvoicevendors'],
	})

	const getManagersQuery = useQuery({
		queryKey: ['signers'],
		queryFn: async () => {
			const {data} = await axios.get('http://192.168.1.131:8081/api/v1/ap/signers')
			return data
		},
	})

	const [mobileTab, setMobileTab] = useState('form')
	const [existingFiles, setExistingFiles] = useState([])

	const hasExisting = existingFiles.length > 0
	const hasNewFiles = files.some((f) => f.isNew)
	const invoiceDisabled = files.some((f) => f.slotKey === 'invoice') || hasExisting

	const mut = useMutation({
		mutationFn: __upload_invoice.post,
		onSuccess: () => {
			reset()
			setExistingFiles([])
		},
		onSettled: () => {
			console.log('Settled')
		},
	})

	const currentStep = files.length === 0 ? 1 : mut.isPending ? 3 : 2

	const handleExistingFound = (found) => {
		setExistingFiles(found)
		if (found.length > 0) {
			update({selectedFile: found[0]})
			setMobileTab('preview')
		}
	}

	const handleDrop = (slotKey, acceptedFiles) => {
		const newFiles = acceptedFiles.map((file) => ({
			id: crypto.randomUUID(),
			file,
			name: file.name,
			customName: file.name,
			size: file.size,
			slotKey,
			isNew: true,
			img: URL.createObjectURL(file),
		}))
		addFilesToSlot(slotKey, newFiles)
		update({selectedFile: newFiles[0]})
		setMobileTab('preview')
	}

	const handleDelete = (id) => removeFile(id)

	const handleSave = () => {
		const {item, files} = useUploadFileState.getState()
		const {isValid, errors} = validateInvoice(item, files)
		if (!isValid) {
			useUploadFileState.setState({errorsFlatMap: errors})
			console.error(errors)
			return
		}
		mut.mutate({item, files})
	}

	const allFiles = [...existingFiles.map((f) => ({...f, isNew: false})), ...files]

	const LeftPanel = (
		<div className="flex flex-col gap-4">
			<StepperBar currentStep={currentStep} />

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			<div className="flex flex-col gap-2">
				<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
					{t('upload_documents')}
				</p>
				<div className="grid grid-cols-2 gap-2">
					<DropzoneSlotMulti
						slotKey="invoice"
						onDrop={handleDrop}
						disabled={invoiceDisabled}
					/>
					<DropzoneSlotMulti slotKey="other" onDrop={handleDrop} disabled={hasExisting} />
				</div>
			</div>

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			<MediaList
				files={allFiles}
				activeFileId={selectedFile?.id}
				onSelect={(file) => {
					update({selectedFile: file})
					setMobileTab('preview')
				}}
				onDelete={handleDelete}
			/>

			<div className="h-px bg-slate-100 dark:bg-slate-700" />

			<FormularioInicio
				vendors={getVendorsQuery}
				users={getManagersQuery}
				onExistingFound={handleExistingFound}
			/>
		</div>
	)

	return (
		<div className="flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
			<header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
				<div className="flex items-center gap-2">
					<h1 className="text-sm font-bold tracking-tight text-slate-800 md:text-base dark:text-white">
						{t('upload_invoice')}
					</h1>
					{hasExisting && (
						<span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
							<LucideAlertTriangle size={10} />
							{t('already_exists')}
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
						{t('cancel')}
					</button>
					<button
						onClick={handleSave}
						disabled={!hasNewFiles || hasExisting || mut.isPending}
						className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:text-sm">
						{mut.isPending ? (
							<span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
						) : (
							<LuSave size={13} />
						)}
						{mut.isPending ? 'Saving...' : t('save')}
					</button>
				</div>
			</header>

			<div className="flex border-b border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800">
				<button
					onClick={() => setMobileTab('form')}
					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
						mobileTab === 'form'
							? 'border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400'
							: 'text-slate-400'
					}`}>
					<LuLayoutList size={14} />
					Form
				</button>
				<button
					onClick={() => setMobileTab('preview')}
					className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${
						mobileTab === 'preview'
							? 'border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400'
							: 'text-slate-400'
					}`}>
					<LuEye size={14} />
					{t('preview')}
					{selectedFile && <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />}
				</button>
			</div>

			<div className="flex flex-1 overflow-hidden">
				<div className="flex flex-1 overflow-hidden md:hidden">
					{mobileTab === 'form' && (
						<div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-slate-800">
							{LeftPanel}
						</div>
					)}
					{mobileTab === 'preview' && (
						<div className="flex flex-1 overflow-hidden p-3">
							<Preview selectedFile={selectedFile} />
						</div>
					)}
				</div>
				<div className="hidden flex-1 overflow-hidden md:flex">
					<aside className="w-96 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						{LeftPanel}
					</aside>
					<main className="flex flex-1 overflow-hidden p-2">
						<Preview selectedFile={selectedFile} />
					</main>
				</div>
			</div>
		</div>
	)
}

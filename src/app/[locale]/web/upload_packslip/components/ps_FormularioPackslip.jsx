'use client'

import {useUploadPackslipState} from '../_state/ps_uploadPackslip.state'
import {Building} from 'lucide-react'
import {useEffect, useState} from 'react'
import {LuClipboardList, LuHash, LuLoader} from 'react-icons/lu'

import {ComboboxVirtualized} from '@/components/utils/ComboboxVirtualized'
import Icons from '@/components/utils/Icons'

import getPonoxVendor from '@/helpers/queries/filemanager/getPonoxvendor'

import {useCheckPackslip} from '@/hooks/useCheckPackslip'
import {useCombobox} from '@/hooks/useCombobox'

function ErrorSpan({error}) {
	if (!error) return null
	return <span className="text-xs text-red-500">{error}</span>
}

function InputField({
	label,
	icon: Icon,
	placeholder,
	value,
	onChange,
	type = 'text',
	required,
	suffix,
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
				{label}
				{required && <span className="text-red-400">*</span>}
			</label>
			<div className="relative">
				{Icon && (
					<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
						<Icon size={13} className="text-slate-400" />
					</div>
				)}
				<input
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={`w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-sm text-slate-800 transition-all outline-none placeholder:text-slate-300 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 ${Icon ? 'pr-3 pl-8' : 'px-3'}`}
				/>
				{suffix && (
					<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
						{suffix}
					</div>
				)}
			</div>
		</div>
	)
}

const VendorItem = ({item}) => (
	<div className="flex flex-col">
		<div>{item.VENDORNO}</div>
		<div className="text-xs text-slate-400">{item.COMPANY}</div>
		<div className="text-xs text-slate-400">{item.CITY}</div>
	</div>
)

const PonoItem = ({item}) => (
	<div className="flex flex-col">
		<div>{item.INFO}</div>
	</div>
)

export default function FormularioPackslip({vendors = [], onExistingFound}) {
	const {item, update, updateItem, getInitialState, errorsFlatMap} = useUploadPackslipState(
		(state) => state,
	)

	const comboboxVendors = useCombobox()
	const comboboxPono = useCombobox()

	const [ponoOptions, setPonoOptions] = useState([])

	useEffect(() => {
		if (!item?.vendors?.ID) return
		const fetchPonos = async () => {
			const pono = await getPonoxVendor(item.vendors.ID)
			setPonoOptions(pono)
		}
		fetchPonos()
	}, [item?.vendors])

	const {existing, meta, checking, hasExisting, isMerged} = useCheckPackslip({
		po_number: item?.pono?.INFO,
		vendors_id: item?.vendors?.ID,
	})

	useEffect(() => {
		if (!hasExisting) {
			onExistingFound?.([])
			return
		}
		if (meta?.invoice_date) {
			const d = new Date(meta.invoice_date)
			updateItem({
				year: String(d.getFullYear()),
				month: String(d.getMonth() + 1).padStart(2, '0'),
				day: String(d.getDate()).padStart(2, '0'),
				invoice_no: meta.invoice_no ?? item?.invoice_no,
			})
		}
		onExistingFound?.(existing)
	}, [hasExisting, existing, meta])

	const dateValue =
		item?.year && item?.month && item?.day
			? `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`
			: ''

	return (
		<div className="flex flex-col gap-3">
			<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
				Pack Slip details
			</p>

			{/* Vendor */}
			<div className="flex flex-col gap-1.5">
				<label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
					Vendor <span className="text-red-400">*</span>
				</label>
				<ComboboxVirtualized
					estimateSize={60}
					comboboxSet={{...comboboxVendors, value: item?.vendors ?? null}}
					itemToId={(item) => item.ID}
					itemToStringLabel={(item) => item.VENDORNO}
					itemRender={(item) => <VendorItem item={item} />}
					searchParams={['COMPANY']}
					Get={vendors}
					Icon={Building}
					cleareable
					onChange={(selected) => {
						update({item: {...getInitialState(), vendors: selected}})
						setPonoOptions([])
					}}
				/>
				<ErrorSpan error={errorsFlatMap?.vendors?.[0]} />
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<div className="flex flex-col gap-1.5">
					<InputField
						label="Invoice No."
						icon={LuHash}
						placeholder="INV-0001"
						value={item?.invoice_no ?? ''}
						onChange={(e) => updateItem({invoice_no: e.target.value})}
						required
					/>
					<ErrorSpan error={errorsFlatMap?.invoice_no?.[0]} />
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
						PO Number <span className="text-red-400">*</span>
					</label>
					<ComboboxVirtualized
						key={item?.vendors?.ID ?? 'no-vendor'}
						comboboxSet={{...comboboxPono, value: item?.pono ?? null}}
						itemToId={(item) => item.ID}
						itemToStringLabel={(item) => item.INFO}
						itemRender={(item) => <PonoItem item={item} />}
						searchParams={['INFO']}
						Get={{data: ponoOptions}}
						Icon={LuClipboardList}
						cleareable
						disabled={!item?.vendors?.ID}
						onChange={(selected) => updateItem({pono: selected})}
						suffix={
							checking ? (
								<LuLoader size={12} className="animate-spin text-slate-400" />
							) : null
						}
					/>
					{hasExisting && !checking && (
						<span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500">
							<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
							{isMerged
								? `Merged — ${existing.length} file${existing.length > 1 ? 's' : ''} (invoice + packslip)`
								: `Already uploaded — ${existing.length} file${existing.length > 1 ? 's' : ''} found`}
						</span>
					)}
					<ErrorSpan error={errorsFlatMap?.pono?.[0]} />
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<InputField
					label="Received Date"
					icon={Icons.Misc.Calendar}
					type="date"
					value={dateValue}
					onChange={(e) => {
						const [year, month, day] = e.target.value.split('-')
						updateItem({day, month, year})
					}}
					required
				/>
				<ErrorSpan error={errorsFlatMap?.month?.[0]} />
			</div>
		</div>
	)
}

'use client'

import {useUploadFileState} from '../_state/uploadinvoice.state'
import {Building} from 'lucide-react'
import {useEffect, useState} from 'react'
import {LuCircleUserRound, LuClipboardList, LuLoader} from 'react-icons/lu'

import {useT} from '@/components/providers/I81nProvider'
import {ComboboxVirtualized} from '@/components/utils/ComboboxVirtualized'
import Icons from '@/components/utils/Icons'

import getPonoxVendor from '@/helpers/queries/filemanager/getPonoxvendor'

import {useCheckInvoice} from '@/hooks/useCheckInvoice'
import {useCombobox} from '@/hooks/useCombobox'

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
					className={`w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-sm text-slate-800 transition-all duration-150 outline-none placeholder:text-slate-300 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-600 ${Icon ? 'pr-3 pl-8' : 'px-3'}`}
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

const CustomComboboxVendors = ({item}) => (
	<div className="flex flex-col">
		<div>{item.VENDORNO}</div>
		<div className="text-xs">{item.COMPANY}</div>
		<div className="text-xs">{item.CITY}</div>
	</div>
)

const CustomComboboxPono = ({item}) => (
	<div className="flex flex-col">
		<div>{item.INFO}</div>
	</div>
)

const CustomComboboxUsers = ({item}) => (
	<div className="flex flex-col">
		<div>{item.BADGE}</div>
		<div className="text-xs">{item.EMAIL}</div>
		<div className="text-xs">{item.EMPLOYEE}</div>
	</div>
)

export default function FormularioInicio({vendors = [], users = [], onExistingFound}) {
	const t = useT()

	const {item, update, updateItem, getInitialState} = useUploadFileState((state) => state)

	const comboboxSetAsyncvendors = useCombobox()
	const comboboxSetAsyncPono = useCombobox()
	const comboboxSetAsyncUsers = useCombobox()

	const [ponoOptions, setPonoOptions] = useState([])

	useEffect(() => {
		if (!item?.vendors?.ID) return
		const fetchPonos = async () => {
			const pono = await getPonoxVendor(item.vendors.ID)
			setPonoOptions(pono)
		}
		fetchPonos()
	}, [item?.vendors])

	const {existing, meta, checking, hasExisting} = useCheckInvoice({
		invoice_no: item?.invoice_no,
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
			})
		}
		onExistingFound?.(existing)
	}, [hasExisting, existing, meta])

	const vendorTienePonos = ponoOptions.length > 0
	const ponoDisabled = !vendorTienePonos || !!item?.misc
	const miscDisabled = vendorTienePonos && !!item?.pono?.ID
	const userDisabled = vendorTienePonos && !item?.misc

	return (
		<div className="flex flex-col gap-3">
			<p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
				Invoice details
			</p>

			<label className="text-[10px] font-semibold tracking-widest text-slate-400 capitalize">
				{t('vendor')}
			</label>
			<ComboboxVirtualized
				estimateSize={60}
				comboboxSet={comboboxSetAsyncvendors}
				itemToId={(item) => item.ID}
				itemToStringLabel={(item) => item.VENDORNO}
				itemRender={(item) => <CustomComboboxVendors item={item} />}
				searchParams={['COMPANY']}
				Get={vendors}
				Icon={Building}
				cleareable
				value={item?.vendors ?? null}
				onChange={(selected) => {
					update({item: {...getInitialState(), vendors: selected}})
					setPonoOptions([])
				}}
			/>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<div className="flex flex-col gap-1.5">
					<InputField
						label={t('invoice_no')}
						icon={Icons.Misc.Clipboard}
						placeholder="INV-0001"
						value={item?.invoice_no ?? ''}
						onChange={(e) => updateItem({invoice_no: e.target.value})}
						required
						suffix={
							checking ? (
								<LuLoader size={12} className="animate-spin text-slate-400" />
							) : null
						}
					/>
					{hasExisting && !checking && (
						<span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500">
							<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
							Already uploaded — {existing.length} file
							{existing.length > 1 ? 's' : ''} found
						</span>
					)}
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="text-[10px] font-semibold tracking-widest text-slate-400 capitalize">
						{t('pono')}
					</label>
					<ComboboxVirtualized
						key={item?.vendors?.ID ?? 'no-vendor'}
						comboboxSet={{
							...comboboxSetAsyncPono,
							value: item?.pono ?? null,
						}}
						itemToId={(item) => item.ID}
						itemToStringLabel={(item) => item.INFO}
						itemRender={(item) => <CustomComboboxPono item={item} />}
						searchParams={['INFO']}
						Get={{data: ponoOptions}}
						Icon={LuClipboardList}
						cleareable
						disabled={ponoDisabled}
						onChange={(selected) => updateItem({pono: selected})}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				<InputField
					label={t('invoice_date')}
					icon={Icons.Misc.Calendar}
					type="date"
					value={
						item?.year && item?.month && item?.day
							? `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`
							: ''
					}
					onChange={(e) => {
						const [year, month, day] = e.target.value.split('-')
						updateItem({day, month, year})
					}}
					required
				/>

				<div className="flex flex-col gap-1.5">
					<label className="text-[10px] font-semibold tracking-widest text-slate-400 capitalize">
						{t('user')}
					</label>
					<ComboboxVirtualized
						estimateSize={60}
						comboboxSet={{
							...comboboxSetAsyncUsers,
							value: item?.user ?? null,
						}}
						itemToId={(item) => item.BADGE}
						itemToStringLabel={(item) => item.EMPLOYEE}
						itemRender={(item) => <CustomComboboxUsers item={item} />}
						searchParams={['BADGE']}
						Get={users}
						Icon={LuCircleUserRound}
						cleareable
						disabled={userDisabled}
						onChange={(selected) => updateItem({user: selected ?? null})}
					/>
				</div>
			</div>

			<div
				className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-200 ${
					miscDisabled
						? 'border-slate-100 bg-slate-50 opacity-50 dark:border-slate-700 dark:bg-slate-800'
						: 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-700'
				}`}>
				<input
					type="checkbox"
					id="misc-check"
					checked={item?.misc ?? false}
					disabled={miscDisabled}
					onChange={(e) => {
						updateItem({
							misc: e.target.checked,
							pono: e.target.checked ? null : item?.pono,
							user: !e.target.checked ? null : item?.user,
						})
					}}
					className="h-4 w-4 cursor-pointer accent-cyan-500 disabled:cursor-not-allowed"
				/>
				<label
					htmlFor="misc-check"
					className={`text-xs font-medium select-none ${
						miscDisabled
							? 'cursor-not-allowed text-slate-400'
							: 'cursor-pointer text-slate-600 dark:text-slate-300'
					}`}>
					{t('misc')}
				</label>
				{miscDisabled && vendorTienePonos && (
					<span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
						{t('pono_selected')}
					</span>
				)}
			</div>

			{item?.misc && (
				<div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-1.5 duration-200">
					<label className="text-[10px] font-semibold tracking-widest text-slate-400 capitalize">
						{t('notes')}
					</label>
					<textarea
						rows={3}
						value={item?.notes ?? ''}
						onChange={(e) => updateItem({notes: e.target.value})}
						placeholder="Add notes..."
						className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm transition-all outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
					/>
				</div>
			)}
		</div>
	)
}

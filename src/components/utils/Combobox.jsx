'use client'

import {useT} from '../providers/I81nProvider'
import {ScrollArea} from '../ui/scroll-area'
import {loaderColor} from './LtSyncLoader'
import {useDebounce} from '@uidotdev/usehooks'
import {Check, ChevronsUpDown, X} from 'lucide-react'
import * as React from 'react'
import {BeatLoader} from 'react-spinners'

import {buttonVariants} from '@/components/ui/button'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover/popover'

import {searchAndSortObjects} from '@/helpers/utils/searchAndSortObjects'

import {cn} from '@/lib/utils'

export function Combobox({
	Get,
	id,
	label,
	placeholder = 'select',
	comboboxSet = null,
	onChange,
	searchParameters = [],
	msgNoData = 'No data found',
	disabled = false,
	cleareable = false,
	isNextFocus = true,
	triggerRef = null,
}) {
	const {value, setValue, clear} = comboboxSet ?? {
		value: null,
		setValue: () => {},
		clear: () => {},
	}

	const t = useT()
	const tMsgNoData = typeof msgNoData === 'string' ? t(msgNoData) : msgNoData
	const tPlaceholder = typeof placeholder === 'string' ? t(placeholder) : placeholder

	//* Open/Close
	const [open, setOpen] = React.useState(false)
	const [firstChange, setFirstChange] = React.useState(true)
	const buttonRef = React.useRef(null)
	React.useEffect(() => {
		if (!open) {
			if (firstChange) {
				setFirstChange(false)
			} else {
				buttonRef.current?.focus()
			}
		}
	}, [open])

	//* Searching
	const [query, setQuery] = React.useState('')
	const debounceQuery = useDebounce(query, 400)

	//* Data
	const data = Get?.data ?? []
	const params = searchParameters?.length ? searchParameters : [label]
	const searching = searchAndSortObjects(data, debounceQuery, params)

	const isError = Get?.isError ?? false
	const isLoading = Get?.isLoading ?? false
	const refetch = typeof Get?.refetch === 'function' ? Get.refetch : () => {}
	const disabledAsync = isLoading || isError
	const clearOnChange = () => {
		typeof onChange === 'function' && onChange(null)
		typeof clear === 'function' && clear()
	}
	const correctLabel = data?.find((e) => e?.[id] === value?.[id])?.[label] ?? null

	//* Scroll to top when search changes
	const scrollAreaRef = React.useRef(null)

	const handleChangeQuery = (e) => {
		setQuery(e)
		scrollAreaRef.current?.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const triggerRefReact = React.useRef(null)

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true} className="ml-2 text-2xl">
			<PopoverTrigger asChild disabled={disabledAsync || disabled}>
				<div
					className={cn(
						buttonVariants({
							variant: 'outline',
						}),
						cn({
							'pointer-events-none truncate opacity-50': disabled || disabledAsync,
						}),
					)}>
					<button
						{...{
							ref: !isNextFocus ? triggerRefReact : triggerRef,
						}}
						role="combobox"
						type="button"
						aria-expanded={open}
						className={cn(
							'flex w-full justify-between overflow-x-auto truncate rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-400',
							{
								'text-slate-400': !correctLabel,
								'text-red-500': isError,
							},
						)}
						disabled={disabled || disabledAsync}
						onClick={() => isError && refetch()}>
						{!isLoading &&
							!isError &&
							(value?.[id] || value?.[id] == 0
								? correctLabel ?? tPlaceholder
								: tPlaceholder)}
						{isLoading && (
							<div className="flex space-x-1">
								<BeatLoader color={loaderColor} size={5} className="my-auto" />
								<span>{t('loading')}</span>
							</div>
						)}
						{isError && t('error') + ' ' + t('try_again')}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</button>
					{cleareable && value?.[id] && (
						<X
							className="ml-2 h-4 w-4 shrink-0 rounded-md p-0.5 text-lg opacity-50 duration-300 hover:bg-red-700 hover:text-white"
							onClick={clearOnChange}
						/>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-full p-2">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder={tPlaceholder}
						onValueChange={handleChangeQuery}
						value={query}
					/>
					<CommandList>
						<CommandGroup>
							{searching?.length ? (
								<ScrollArea className="h-40">
									{Array.isArray(searching) &&
										searching?.map((e) => (
											<CommandItem
												key={e?.[id]}
												value={e}
												onSelect={() => {
													typeof onChange === 'function' && onChange(e)
													typeof setValue === 'function' && setValue(e)
													setOpen(false)
													if (!isNextFocus) {
														setTimeout(() => {
															triggerRefReact.current?.focus()
														}, 0)
													}
												}}>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														value?.[id] === e?.[id]
															? 'opacity-100'
															: 'opacity-0',
													)}
												/>
												{e?.[label]}
											</CommandItem>
										))}
								</ScrollArea>
							) : (
								<span className="mx-auto text-center text-sm text-slate-400">
									{tMsgNoData}
								</span>
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

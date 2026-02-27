'use client'

import {useT} from '../providers/I81nProvider'
import {useVirtualizer} from '@tanstack/react-virtual'
import {useDebounce} from '@uidotdev/usehooks'
import * as React from 'react'
import {useImperativeHandle} from 'react'
import {useMemo} from 'react'
import {useState} from 'react'

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	useFilteredItems,
} from '@/components/ui/combobox'

import {searchAndSortObjects} from '@/helpers/utils/searchAndSortObjects'

export function ComboboxVirtualized({
	Get,
	itemToId,
	itemToStringLabel,
	itemRender,
	placeholder = 'select',
	comboboxSet,
	onChange,
	disabled = false,
	cleareable = false,
	estimateSize = 36,
	searchParams = [],
	Icon,
}) {
	if (searchParams.length === 0) {
		throw new Error('searchParams is empty')
	}

	if (typeof itemToId !== 'function') {
		throw new Error('itemToId is not a function')
	}

	if (typeof itemToStringLabel !== 'function') {
		throw new Error('itemToStringLabel is not a function')
	}

	const t = useT()

	const {value, setValue} = comboboxSet ?? {
		value: null,
		setValue: () => {},
	}

	const data = useMemo(() => Get?.data ?? [], [Get?.data])

	const [inputValue, setInputValue] = useState('')
	const debouncedInputValue = useDebounce(inputValue, 1500)

	const filteredData = useMemo(() => {
		if (!searchParams.length) {
			return undefined
		}

		const f = searchAndSortObjects(data, debouncedInputValue, searchParams)
		return f
	}, [data, debouncedInputValue, searchParams])

	const isLoading = Get?.isLoading ?? false
	const isError = Get?.isError ?? false
	const refetch = Get?.refetch ?? (() => {})
	const disabledAsync = isLoading || isError

	const virtualizerRef = React.useRef(null)

	return (
		<Combobox
			virtualized
			itemToStringLabel={itemToStringLabel}
			items={data}
			filteredItems={filteredData}
			inputValue={inputValue}
			onInputValueChange={(value) => {
				setInputValue(value)
			}}
			value={value}
			onValueChange={(item) => {
				setValue(item)
				onChange?.(item)
			}}
			onItemHighlighted={(item, {reason, index}) => {
				const virtualizer = virtualizerRef.current
				if (!item || !virtualizer) {
					return
				}
				const isStart = index === 0
				const isEnd = index === virtualizer.options.count - 1
				const shouldScroll =
					reason === 'none' || (reason === 'keyboard' && (isStart || isEnd))
				if (shouldScroll) {
					queueMicrotask(() => {
						virtualizer.scrollToIndex(index - 2, {align: isEnd ? 'start' : 'end'})
					})
				}
			}}
			disabled={disabled || disabledAsync}>
			<ComboboxInput
				placeholder={t(placeholder)}
				showClear={cleareable}
				showLoader={isLoading}
				showError={isError}
				disabled={disabled || disabledAsync}
				refetch={refetch}
				leftIcon={Icon}
			/>

			<ComboboxContent>
				<ComboboxEmpty>{t('No data found')}</ComboboxEmpty>

				<ComboboxList>
					<VirtualizedList
						itemToId={itemToId}
						itemToStringLabel={itemToStringLabel}
						itemRender={itemRender}
						estimateSize={estimateSize}
						virtualizerRef={virtualizerRef}
					/>
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	)
}

function VirtualizedList({itemToId, itemToStringLabel, itemRender, estimateSize, virtualizerRef}) {
	const filteredItems = useFilteredItems()

	const scrollRef = React.useRef(null)

	const virtualizer = useVirtualizer({
		count: filteredItems.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => estimateSize,
		overscan: 8,
	})

	useImperativeHandle(virtualizerRef, () => virtualizer)

	const virtualItems = virtualizer.getVirtualItems()
	const totalSize = virtualizer.getTotalSize()

	if (!filteredItems.length) return null

	return (
		<div ref={scrollRef} className="max-h-60 overflow-auto">
			<div
				style={{
					height: totalSize,
					position: 'relative',
				}}>
				{virtualItems.map((virtualItem) => {
					const item = filteredItems[virtualItem.index]
					if (!item) return null

					return (
						<ComboboxItem
							key={itemToId(item)}
							value={item}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: virtualItem.size,
								transform: `translateY(${virtualItem.start}px)`,
							}}>
							{typeof itemRender === 'function'
								? itemRender(item)
								: itemToStringLabel(item)}
						</ComboboxItem>
					)
				})}
			</div>
		</div>
	)
}

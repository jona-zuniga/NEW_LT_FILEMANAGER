'use client'

import {useT} from '../providers/I81nProvider'
import Icons from './Icons'
import LtSyncLoader from './LtSyncLoader'
import clsx from 'clsx'
import * as React from 'react'

import {
	CommandDialog,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'

export function CommandDialogSearch({
	openSet = [],
	id,
	label,
	controlKey = 'k',
	Get = {},
	msgNoData = 'no_data_found',
	childrenRender,
	value = null,
	placeholder = 'search',
	onSelect = () => {},
}) {
	const t = useT()

	const tMsgNoData = typeof msgNoData === 'string' ? t(msgNoData) : msgNoData

	const data = Get?.data ?? []
	const isError = Get?.isError ?? false
	const isLoading = Get?.isLoading ?? false
	const refetch = typeof Get?.refetch === 'function' ? Get.refetch : () => {}
	const isSelected = (e) => e?.[id] === value?.[id]

	const [, setOpen] = openSet

	React.useEffect(() => {
		const down = (e) => {
			if (e.key === controlKey && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<CommandDialog openSet={openSet}>
			<CommandInput placeholder={t(placeholder)} />
			<CommandList>
				<CommandGroup>
					{data.map((e) => (
						<CommandItem
							key={e?.[id]}
							value={e}
							onSelect={() => {
								typeof onSelect === 'function' && onSelect(e)
							}}>
							{childrenRender ? (
								childrenRender(e, id, label, isSelected(e))
							) : (
								<div>
									{e?.[label]}
									{value && (
										<Icons.Misc.Check
											className={clsx(
												'ml-auto text-transparent',
												isSelected(e) && 'text-green-500',
											)}></Icons.Misc.Check>
									)}
								</div>
							)}
						</CommandItem>
					))}
				</CommandGroup>
				{!data?.length && !isLoading && !isError && <CommandItem>{tMsgNoData}</CommandItem>}
				{isError && (
					<CommandItem onClick={refetch}>{t('error') + ' ' + t('try_again')}</CommandItem>
				)}
				{isLoading && (
					<CommandItem>
						<LtSyncLoader />
					</CommandItem>
				)}
			</CommandList>
		</CommandDialog>
	)
}

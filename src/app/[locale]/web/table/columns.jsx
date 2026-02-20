'use client'

import {createColumnHelper} from '@tanstack/react-table'
import {MoreHorizontal} from 'lucide-react'

import {useT} from '@/components/providers/I81nProvider'
import {Button} from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {LtDataTableToogleOrder} from '@/components/utils/DataTable'

import {generateMetaData} from '@/helpers/utils/exportTable'

const columnHelper = createColumnHelper()
export const useColumns = () => {
	const t = useT()

	return [
		columnHelper.accessor('code', {
			header: ({column}) => {
				return <LtDataTableToogleOrder column={column} content={'code'} />
			},
			meta: {
				//* This is for excel export
				// When the cell is not manipulated by external logic
				export: generateMetaData({exKey: 'code', exHeader: t('code')}),
			},
		}),

		columnHelper.accessor('animal', {
			header: ({column}) => {
				return <LtDataTableToogleOrder column={column} content={'animal'} />
			},
			cell: ({getValue}) => {
				return getValue() + ' animal'
			},
			meta: {
				//* This is for excel export
				// Basic column when the cell is manipulated by external logic
				export: generateMetaData({
					exHeader: t('animal'),
					render: ({getValue}) => {
						return getValue() + ' animal in excel'
					},
				}),
			},
		}),

		columnHelper.accessor('quantity', {
			header: ({column}) => {
				return <LtDataTableToogleOrder column={column} content={'quantity'} />
			},
			cell: ({getValue}) => {
				return getValue() + ' quantity'
			},
			meta: {
				//* This is for excel export
				// When need cell render
				// Note: render params is equivalent to original cell render params
				export: generateMetaData({
					exHeader: t('quantity'),
					render: ({renderCell}) => renderCell(),
				}),
			},
		}),

		columnHelper.accessor('date', {
			header: ({column}) => {
				return <LtDataTableToogleOrder column={column} content={'date'} />
			},
		}),

		columnHelper.accessor('user', {
			header: ({column}) => {
				return <LtDataTableToogleOrder column={column} content={'user'} />
			},
		}),

		columnHelper.display({
			id: 'actions',
			header: () => t('actions'),
			cell: ({row}) => {
				const original = row.original

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" className="h-8 w-8 p-0">
								<span className="sr-only">{t('open_menu')}</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									alert(JSON.stringify(original, null, 2))
								}}>
								{t('show')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		}),
	]
}

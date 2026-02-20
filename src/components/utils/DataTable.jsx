'use client'

import {useT} from '../providers/I81nProvider'
import {Input} from '../ui/input'
import Icons from './Icons'
import Pagination from './Pagination'
import {rankItem} from '@tanstack/match-sorter-utils'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {useDebounce, useIsClient} from '@uidotdev/usehooks'
import {ArrowDown, ArrowUp, ArrowUpDown, Filter, FilterX, SearchIcon} from 'lucide-react'
import moment from 'moment'
import {useMemo, useState} from 'react'

import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import LtSyncLoader from '@/components/utils/LtSyncLoader'

import exportToExcel from '@/helpers/utils/exportTable'

export function DataTable({
	columns,
	Get,
	Controls = null,
	enableExportExcel = false,
	tableName = null,
	initialFilters = [],
	initialFiltersOpen = false,
	rowClassName = () => '',
	rowOnClisck = () => {},
	enablePagination = true,
}) {
	const isClient = useIsClient()
	const data = useMemo(() => Get?.data ?? [], [Get?.data])
	const isError = useMemo(() => Get?.isError ?? false, [Get?.isError])
	const isLoading = useMemo(() => Get?.isLoading ?? false, [Get?.isLoading])
	const refetch = useMemo(
		() => (typeof Get?.refetch === 'function' ? Get.refetch : () => {}),
		[Get?.refetch],
	)
	const isEmpty = useMemo(
		() => !data?.length && !isLoading && !isError,
		[data, isLoading, isError],
	)

	const [sorting, setSorting] = useState([])
	const [columnVisibility, setColumnVisibility] = useState({})
	const [rowSelection, setRowSelection] = useState({})
	const [globalFilter, setGlobalFilter] = useState('')
	const debounceGlobalFilter = useDebounce(globalFilter, 300)
	const [columnFilters, setColumnFilters] = useState(initialFilters)
	const [showFilter, setShowFilter] = useState(initialFiltersOpen)

	const handleTogleColumnFilter = () => {
		setColumnFilters([])
		setShowFilter((showFilter) => !showFilter)
	}

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter: debounceGlobalFilter,
		},
	})

	const getTableData = () => {
		const data = getFilteredRowModel()(table)()

		const originalData = data.rows.map((row) => {
			return row.getVisibleCells().reduce((acc, cell) => {
				const {column} = cell

				const {columnDef} = column

				const renderCell = () => columnDef.cell(cell)
				const metaCol = column.columnDef.meta
				const headerEx = metaCol?.export?.header
				const valueEx = metaCol?.export?.value({...cell, renderCell})

				if (typeof valueEx === 'undefined') {
					return acc
				}

				return {
					...acc,
					[headerEx]: valueEx,
				}
			}, {})
		})

		const nowDate = moment().format('YYYY_MM_DD_HH_mm_ss')
		exportToExcel(originalData, `${tableName}_${nowDate}.xlsx`)
	}

	return (
		<div className="relative flex h-full w-full flex-col space-y-1 rounded-sm bg-white dark:bg-slate-800">
			<div className="flex w-full items-start justify-end">
				<div className="m-1 flex w-full justify-start space-x-2">
					{Controls ? Controls() : null}
				</div>
				<div className="flex w-max items-center justify-between space-x-2">
					{enableExportExcel && (
						<Button
							variant="confirm"
							className="w-max bg-green-700 hover:bg-green-600"
							onClick={getTableData}>
							<Icons.Options.Excel></Icons.Options.Excel>
						</Button>
					)}
					<Button variant="icon" className="w-max" onClick={handleTogleColumnFilter}>
						{!showFilter ? <Filter /> : <FilterX></FilterX>}
					</Button>
					<div>
						<SearchIcon className="h-6 w-6" />
					</div>
					<div className="p-1">
						<Input
							className="w-40"
							value={globalFilter}
							placeholder={'Search'}
							onChange={(e) => setGlobalFilter(String(e.target.value))}></Input>
					</div>
				</div>
			</div>
			<div className="relative flex h-full w-full flex-1 space-y-1 overflow-y-auto rounded-sm bg-white dark:bg-slate-800">
				{!isEmpty && (
					<Table
						className="border-border relative h-10 w-full flex-1 overflow-clip rounded-md"
						divClassname="h-full overflow-y-auto overflow-x-auto">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} className="h-full">
												<div className="flex h-full flex-col justify-between">
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
													<div>
														{header.column.getCanFilter() &&
														showFilter ? (
															<div className="mt-auto h-full">
																<LtColumnFilter
																	column={header.column}
																/>
															</div>
														) : null}
													</div>
												</div>
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						{isClient && (
							<TableBody>
								{!isLoading && !isError && table.getRowModel().rows?.length
									? table.getRowModel().rows.map((row) => (
											<TableRow
												key={row.id}
												className={
													typeof rowClassName === 'function'
														? rowClassName(row)
														: ''
												}
												onClick={(e) =>
													typeof rowOnClisck === 'function' &&
													rowOnClisck(e, row)
												}
												data-state={row.getIsSelected() && 'selected'}>
												{row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</TableCell>
												))}
											</TableRow>
										))
									: false}
							</TableBody>
						)}
					</Table>
				)}
				{isEmpty && (
					<div className="flex h-full w-full flex-col items-center justify-center space-y-2">
						<div className="flex flex-col items-center justify-center space-y-2 rounded-md bg-neutral-100 p-4 font-semibold">
							<div>
								<Icons.Misc.NoData className="h-12 w-12" />
							</div>
							<span className="flex space-x-2 whitespace-nowrap">No data yet</span>
						</div>
					</div>
				)}
			</div>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center space-x-2 rounded-sm bg-slate-500/25">
					<LtSyncLoader />
				</div>
			)}
			{isError && (
				<div className="absolute inset-0 flex items-center justify-center space-x-2 rounded-sm bg-slate-500/25">
					<div className="flex w-1/2 flex-col items-center justify-center space-y-2">
						<span className="flex space-x-2 whitespace-nowrap">Error on get data</span>
						<Button variant="outline" onClick={refetch}>
							<span>Try again</span>
						</Button>
					</div>
				</div>
			)}
			{enablePagination && (
				<Pagination
					page={table.getState().pagination.pageIndex + 1}
					totalPages={table.getPageCount().toLocaleString()}
					onNextPage={() => table.nextPage()}
					onPrevPage={() => table.previousPage()}
					onFirstPage={() => table.setPageIndex(0)}
					onLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
					qxPage={table.getState().pagination.pageSize}
					onQxpagChange={(qxpag) => table.setPageSize(qxpag)}
					defaultQxPage={10}></Pagination>
			)}
		</div>
	)
}

export const LtDataTableToogleOrder = ({column, content}) => {
	const t = useT()
	const translateContent = typeof content === 'string' ? t(content) : content
	const stateSort = column.getIsSorted()

	return (
		<Button variant="ghost" onClick={column.getToggleSortingHandler()}>
			{translateContent}
			{stateSort === 'asc' && <ArrowUp className="ml-0.5 h-4 w-4" />}
			{stateSort === 'desc' && <ArrowDown className="ml-0.5 h-4 w-4" />}
			{!stateSort && <ArrowUpDown className="ml-0.5 h-4 w-4" />}
		</Button>
	)
}

export const LtDescriptionContainer = ({column: {getValue = () => null}}) => {
	return (
		<div className="block w-full truncate text-left">
			{getValue()?.slice(0, 20) ?? '--'} {getValue()?.length > 20 && '...'}
		</div>
	)
}

function LtColumnFilter({column}) {
	const columnFilterValue = column.getFilterValue()

	return (
		<Input
			className="m-0.5 w-full min-w-[100px]"
			type="text"
			value={columnFilterValue ?? ''}
			onChange={(e) => column.setFilterValue(String(e.target.value))}
			placeholder={`Search...`}
		/>
	)
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value)

	addMeta({
		itemRank,
	})

	return itemRank.passed
}

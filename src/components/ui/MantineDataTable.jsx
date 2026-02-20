'use client'

import {useT} from '../providers/I81nProvider'
import InputSearch from '../utils/InputSearch'
import {CloseButton, Group, Stack, Switch, TextInput} from '@mantine/core'
import sortBy from 'lodash/sortBy'
import {DataTable} from 'mantine-datatable'
import {useTheme} from 'next-themes'
import {useEffect, useLayoutEffect, useMemo, useState} from 'react'

const PAGE_SIZE = 30

const renderFilter = ({filter, value, data, type, options, onChange, placeholder}, index) => {
	const t = useT()

	if (type === 'text') {
		return (
			<div className="mx-1 px-2" key={index}>
				<TextInput
					style={{width: 180}}
					placeholder={t(`${placeholder}`) || `Search by ${filter}`}
					value={value}
					onChange={(event) => onChange(event.currentTarget.value)}
					rightSection={
						<CloseButton
							className="hover:text-[#f44336]"
							size="sm"
							variant="transparent"
							onClick={() => onChange('')}
							style={{display: value ? undefined : 'none'}}
						/>
					}
				/>
			</div>
		)
	} else if (type === 'select') {
		return (
			<InputSearch
				key={index}
				current_value={value}
				data={data ?? []}
				options={options}
				onChange={onChange}
			/>
		)
	} else if (type === 'check') {
		return (
			<Switch
				key={index}
				label={t(`${placeholder}`)}
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked ? 1 : 0)}
				size="xs"
				className="flex h-max w-[9%] cursor-pointer p-2"
			/>
		)
	}
}

export default function MantineDatatable({
	records,
	fetching,
	model,
	filters,
	Buttons = null,
	Panel = null,
	title = null,
	rowClassName,
	maxPageSize = PAGE_SIZE,
}) {
	const t = useT()
	const [filteredRecords, setFilteredRecords] = useState(records)
	const [totalRecords, setTotalRecords] = useState(0)
	const [sortStatus, setSortStatus] = useState({columnAccessor: null, direction: 'asc'})
	const [newModel, setNewModel] = useState([])
	const [page, setPage] = useState(1)

	useLayoutEffect(() => {
		const translatedModel = model.map((m) => {
			if (m.title) {
				return {...m, title: t(m.title)}
			}
			return m
		})
		setNewModel(translatedModel)
	}, [model, t])
	const columns = useMemo(() => newModel, [newModel])

	useEffect(() => {
		if (!records) return
		if (newModel.length === 0) return
		let data = records

		// Aplicar filtros
		if (filters) {
			filters.forEach(({filter, value, type}) => {
				if (value) {
					if (type === 'text') {
						data = data.filter((record) => {
							if (Array.isArray(filter)) {
								return filter.some((key) =>
									record[key]?.toLowerCase().includes(value.toLowerCase()),
								)
							}
							return record[filter]?.toLowerCase().includes(value.toLowerCase())
						})
					} else if (type === 'select') {
						data = data.filter((record) => record[filter] == value)
					} else if (type === 'check') {
						data = data.filter((record) => record[filter] === value)
					}
				}
			})
		}

		// Aplicar ordenación
		if (sortStatus.columnAccessor) {
			data = sortBy(data, sortStatus.columnAccessor)
			if (sortStatus.direction === 'desc') {
				data = data.reverse()
			}
		}

		// Actualizar total de registros filtrados antes de la paginación
		const totalFilteredRecords = data.length

		// Aplicar paginación
		const from = (page - 1) * maxPageSize
		const to = from + maxPageSize
		const paginatedData = data.slice(from, to)

		setTotalRecords(totalFilteredRecords)
		setFilteredRecords(paginatedData)
	}, [records, filters, newModel.length, sortStatus, page])

	const {resolvedTheme} = useTheme()

	return (
		<Stack className="!dark:text-white flex size-full flex-1 flex-col overflow-y-auto rounded-md bg-white px-1 dark:rounded-lg dark:bg-slate-800">
			{title && (
				<h1 className="flex w-full items-center justify-center pt-2 align-middle text-xl font-bold">
					{t(title)}
				</h1>
			)}
			<Group className="h-max w-full" justify="center">
				<div className="space-x flex size-full p-2">
					{Panel}
					{typeof Buttons === 'function' && typeof Panel !== 'function' && <Buttons />}
					{filters && filters?.map((filter, index) => renderFilter(filter, index))}
				</div>
			</Group>
			<DataTable
				className="h-full"
				loaderType="oval"
				loaderSize="lg"
				loaderColor="blue"
				highlightOnHover
				textSelectionDisabled
				records={filteredRecords}
				totalRecords={totalRecords}
				recordsPerPage={maxPageSize}
				page={page}
				onPageChange={(p) => setPage(p)}
				fetching={fetching}
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				columns={columns?.map((column) => ({
					...column,
					sortable: true,
				}))}
				rowClassName={rowClassName}
				styles={{
					root: {
						backgroundColor: 'transparent',
					},
					header: {
						backgroundColor: resolvedTheme === 'dark' ? '#1e293b' : 'white',
					},
					table: {
						backgroundColor: 'transparent',
					},
				}}
			/>
		</Stack>
	)
}

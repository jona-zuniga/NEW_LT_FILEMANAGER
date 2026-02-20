'use client'

import {useColumns} from './columns'
import {useQuery} from '@tanstack/react-query'
import React from 'react'

import {DataTable} from '@/components/utils/DataTable'

import {queryKeys} from '@/constants/queryKeys'

import {__example} from '@/services/ex.service'

export default function page() {
	const columns = useColumns()

	/** Using asynchronous table */
	const QExample = useQuery({
		queryFn: __example.get.all,
		queryKey: [queryKeys.example],
	})

	return (
		<div className="flex h-full w-full flex-col space-y-2">
			<div className="w-full flex-1 overflow-y-auto">
				<DataTable
					columns={columns}
					enableExportExcel={true}
					Get={{
						...QExample,
						data: !QExample.data ? [] : QExample.data,
					}}
				/>
			</div>
		</div>
	)
}

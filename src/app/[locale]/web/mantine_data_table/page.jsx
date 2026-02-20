'use client'

import exampleModel from './_components/models/exampleModel'
import {useQuery} from '@tanstack/react-query'
import React, {useState} from 'react'

import MantineDatatable from '@/components/ui/MantineDataTable'
import {Input} from '@/components/ui/input'

import {queryKeys} from '@/constants/queryKeys'

import {__example} from '@/services/ex.service'

const Panel = ({selectedVin, setSelectedVin}) => {
	return (
		<>
			<Input value={selectedVin} onChange={(e) => setSelectedVin(e.target.value)}></Input>
		</>
	)
}

export default function Page() {
	const QExample = useQuery({
		queryFn: __example.get.all,
		queryKey: [queryKeys.example],
	})

	const [selectedVin, setSelectedVin] = useState('')

	return (
		<div className="flex h-full w-full flex-1 flex-col space-x-2 space-y-2 overflow-y-auto">
			<MantineDatatable
				Panel={<Panel selectedVin={selectedVin} setSelectedVin={setSelectedVin} />}
				records={QExample?.data ?? []}
				fetching={QExample.isFetching}
				model={exampleModel}
				title={'table'}
			/>
		</div>
	)
}

import React, {useEffect, useState} from 'react'
import SelectPicker from 'rsuite/SelectPicker'

import '@/styles/rsuite.css'

export default function InputSearch({
	data,
	current_value = null,
	onChange = null,
	options: {
		name = 'input',
		loading = false,
		label = null,
		disabled = false,
		cleanable = true,
		width = 250,
		data: {text, value},
	},
}) {
	const [processedData, setProcessedData] = useState([])
	useEffect(() => {
		setProcessedData(
			data.map((e) => {
				return {
					label: e[text],
					value: e[value],
				}
			}),
		)
	}, [data])

	return (
		<div className="mx-1 px-2">
			<SelectPicker
				name={name}
				loading={loading}
				label={label}
				value={current_value}
				disabled={disabled}
				data={processedData}
				cleanable={cleanable}
				style={{width: width}}
				error="an error"
				onChange={(value) => {
					onChange(value)
				}}
			/>
		</div>
	)
}


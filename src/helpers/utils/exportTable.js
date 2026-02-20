// utils/exportToExcel.js
import {saveAs} from 'file-saver'
import * as XLSX from 'xlsx-js-style'

export const generateMetaData = ({exKey, exHeader, render = null}) => {
	const field = exKey
	const header = exHeader
	const renderFn =
		typeof render === 'function'
			? ({row, ...rest}) => {
					const value = row.original[field]

					return render({original: row.original, value, ...rest})
				}
			: ({row}) => {
					return row.original[field]
				}

	return {
		header,
		value: renderFn,
	}
}

const getHeaders = (data) => {
	const headers = data[0]
	return Object.entries(headers).map(([key]) => {
		return key
	})
}
const getValues = (data) => {
	return data.map((row) => {
		return Object.entries(row).map(([, value]) => {
			return value
		})
	})
}

export default function exportToExcel(data, filename) {
	const headers = getHeaders(data).map((e) => ({
		v: String(e),
		t: 's',
		s: {
			font: {bold: true},
			border: {
				top: {style: 'thin'},
				bottom: {style: 'thin'},
				left: {style: 'thin'},
				right: {style: 'thin'},
			},
		},
	}))
	const values = getValues(data).map((r) =>
		r.map((e) => ({
			v: String(e),
			t: 's',
			s: {
				border: {
					top: {style: 'thin'},
					bottom: {style: 'thin'},
					left: {style: 'thin'},
					right: {style: 'thin'},
				},
			},
		})),
	)
	const allData = [headers, ...values]
	const worksheet = XLSX.utils.aoa_to_sheet(allData)

	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

	const wbout = XLSX.write(workbook, {bookType: 'xlsx', type: 'binary'})

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
		return buf
	}

	const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
	saveAs(blob, filename)
}

import {useEffect, useRef, useState} from 'react'

export function useCheckInvoice({invoice_no, vendors_id, delay = 800}) {
	const [existing, setExisting] = useState([])
	const [meta, setMeta] = useState(null)
	const [checking, setChecking] = useState(false)
	const timerRef = useRef(null)

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current)

		if (!invoice_no?.trim() || !vendors_id) {
			setExisting([])
			setMeta(null)
			return
		}

		setChecking(true)

		timerRef.current = setTimeout(async () => {
			try {
				const params = new URLSearchParams({invoice_no: invoice_no.trim(), vendors_id})
				const res = await fetch(`/api/file-manager/check-invoice?${params}`)
				const data = await res.json()

				setExisting(data.files ?? [])
				setMeta(data.meta ?? null)
			} catch (err) {
				console.error('useCheckInvoice error:', err)
				setExisting([])
				setMeta(null)
			} finally {
				setChecking(false)
			}
		}, delay)

		return () => clearTimeout(timerRef.current)
	}, [invoice_no, vendors_id])

	const hasExisting = existing.length > 0

	return {existing, meta, checking, hasExisting}
}

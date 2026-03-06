// hooks/useCheckPackslip.js
import {useEffect, useRef, useState} from 'react'

export function useCheckPackslip({po_number, vendors_id, delay = 800}) {
	const [existing, setExisting] = useState([])
	const [meta, setMeta] = useState(null)
	const [checking, setChecking] = useState(false)
	const timerRef = useRef(null)

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current)

		if (!po_number?.trim() || !vendors_id) {
			setExisting([])
			setMeta(null)
			return
		}

		setChecking(true)

		timerRef.current = setTimeout(async () => {
			try {
				const params = new URLSearchParams({po_number: po_number.trim(), vendors_id})
				const res = await fetch(`/api/file-manager/check-packslip?${params}`)
				const data = await res.json()

				setExisting(data.files ?? [])
				setMeta(data.meta ?? null)
			} catch (err) {
				console.error('useCheckPackslip error:', err)
				setExisting([])
				setMeta(null)
			} finally {
				setChecking(false)
			}
		}, delay)

		return () => clearTimeout(timerRef.current)
	}, [po_number, vendors_id])

	const hasExisting = existing.length > 0
	// merged = true cuando el packslip ya fue unido a su invoice
	const isMerged = meta?.merged ?? false

	return {existing, meta, checking, hasExisting, isMerged}
}

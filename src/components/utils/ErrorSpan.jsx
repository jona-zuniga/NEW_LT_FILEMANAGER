'use client'

import { cn } from '@/lib/utils'
import { useT } from '../providers/I81nProvider'

export default function ErrorSpan({ error }) {
	const t = useT()

	return (
		<span className={cn("text-sm text-red-500 flex flex-col gap-1 wrap-break-word", {
			'text-transparent bg-transparent': !Array.isArray(error) && !error?.length
		})}>
			{Array.isArray(error) ? error?.map((e, index) => (
				<span key={index} className="wrap-break-word">{t(e)}</span>
			)) : null}
		</span>
	)
}
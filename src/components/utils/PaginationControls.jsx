import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from 'lucide-react'

import {Button} from '@/components/ui/button'

export default function PaginationControls({
	handleOnFirstPage,
	handleOnLastPage,
	handleOnNextPage,
	handleOnPrevPage,
	page,
	totalPages,
}) {
	const validateFunction = (fn) => {
		if (fn === undefined) return

		if (typeof fn !== 'function') return

		fn()
	}

	return (
		<div className="mx-1 flex gap-2">
			{/* First Page */}
			<Button
				size="sm"
				variant="outline"
				disabled={page <= 1}
				onClick={() => validateFunction(handleOnFirstPage)}>
				<ChevronsLeft className="h-4 w-4"></ChevronsLeft>
			</Button>

			{/* Prev Page */}
			<Button
				size="sm"
				variant="outline"
				disabled={page <= 1}
				onClick={() => validateFunction(handleOnPrevPage)}>
				<ChevronLeft className="h-4 w-4"></ChevronLeft>
			</Button>
			{/* Next */}
			<Button
				size="sm"
				variant="outline"
				disabled={page >= totalPages}
				onClick={() => validateFunction(handleOnNextPage)}>
				<ChevronRight className="h-4 w-4"></ChevronRight>
			</Button>

			{/* Last page */}
			<Button
				size="sm"
				variant="outline"
				disabled={page >= totalPages}
				onClick={() => validateFunction(handleOnLastPage)}>
				<ChevronsRight className="h-4 w-4"></ChevronsRight>
			</Button>
		</div>
	)
}

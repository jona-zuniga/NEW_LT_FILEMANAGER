'use client'

import PaginationControls from './PaginationControls'

export default function Pagination({
	onNextPage,
	onPrevPage,
	page = 1,
	totalPages = 10,
	onFirstPage,
	onLastPage,
	onQxpagChange,
	qxPage = null,
	defaultQxPage = 10,
}) {
	const handleOnFirstPage = () => {
		onFirstPage()
	}

	const handleOnPrevPage = () => {
		if (page - 1 === 0) return
		onPrevPage()
	}

	const handleOnNextPage = () => {
		if (page + 1 > totalPages) return
		onNextPage()
	}

	const handleOnLastPage = () => {
		onLastPage()
	}

	return (
		<div className="flex items-center justify-center space-y-1 rounded-lg bg-white p-2 text-sm dark:bg-slate-800">
			<div className="flex items-center justify-center space-x-1 font-semibold">
				<div>
					Page {page} of {totalPages} on
				</div>
				<select
					className="w-max rounded-lg border border-gray-300 p-1"
					value={qxPage ?? defaultQxPage}
					onChange={(e) => {
						onQxpagChange(Number(e.target.value))
					}}>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
					<option value={25}>25</option>
					<option value={30}>30</option>
					<option value={35}>35</option>
					<option value={40}>40</option>
					<option value={45}>45</option>
					<option value={50}>50</option>
					<option value={55}>55</option>
					<option value={60}>60</option>
				</select>
				<div>per page</div>
			</div>

			<div>
				<PaginationControls
					page={page}
					handleOnFirstPage={handleOnFirstPage}
					handleOnLastPage={handleOnLastPage}
					handleOnNextPage={handleOnNextPage}
					handleOnPrevPage={handleOnPrevPage}
					totalPages={totalPages}
				/>
			</div>
		</div>
	)
}

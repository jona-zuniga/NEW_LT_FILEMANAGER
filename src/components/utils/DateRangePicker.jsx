'use client'

import {useT} from '../providers/I81nProvider'
import Icons from '../utils/Icons'
import {format} from 'date-fns'
import {X} from 'lucide-react'
import * as React from 'react'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover/popover'

import {useDialog} from '@/hooks/useDialog'

import {cn} from '@/lib/utils'

/**
 * DatePickerWithRange
 *
 * @param {string} className
 * @param {object} dateState dateState use useDateRangePicker()
 * @param {boolean} single define if you want to select a single date or a range
 * @param {number} numberOfMonths number of months to display en each view
 * @param {boolean} autoClose define if you want to close the popover when a date is selected
 * @param {function} targetRef define a ref to the button to focus when the popover is open
 * @param {function} onKeyDownTrigger define a function to call when the user press the enter key
 * @param {boolean} cleareable define if you want to show the clear button
 */
export default function DatePickerWithRange({
	className,
	dateState,
	single = false,
	numberOfMonths = 1,
	autoClose = false,
	targetRef = null,
	onKeyDownTrigger = null,
	onCompleteSelection = null,
	cleareable = false,
}) {
	const t = useT()
	const {date, setDate, clear} = dateState
	const dialog = useDialog()

	const clearOnChange = () => {
		typeof clear === 'function' && clear()
	}

	const onSelect = (e) => {
		setDate(e)

		if (typeof onCompleteSelection === 'function') {
			if (single && e) {
				onCompleteSelection(e)
			} else if (e?.from && e?.to) {
				onCompleteSelection(e)
			}
		}

		if (autoClose) {
			if (single && e) {
				dialog.setShow(false)
			} else if (e?.from && e?.to) {
				dialog.setShow(false)
			}
		}
	}

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover open={dialog.show} onOpenChange={dialog.setShow}>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						ref={(e) => typeof targetRef === 'function' && targetRef(e)}
						onKeyDown={(e) => {
							typeof onKeyDownTrigger === 'function' && onKeyDownTrigger({...e, date})
							if (e.key === 'Enter') {
								e.preventDefault()
								dialog.setShow(true)
							}
						}}
						className={cn(
							'flex w-full justify-start text-left font-normal focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-400',
							!date && 'text-muted-foreground',
						)}>
						<div className="flex w-full">
							<Icons.Misc.Calendar className="mr-2 h-4 w-4" />
							{!single &&
								(date?.from ? (
									date?.to ? (
										<>
											{format(date?.from, 'LLL dd, y')} -{' '}
											{format(date?.to, 'LLL dd, y')}
										</>
									) : (
										format(date?.from, 'LLL dd, y')
									)
								) : (
									<span>{t('pick_a_date_range')}</span>
								))}
							{single &&
								(date ? (
									format(date, 'LLL dd, y')
								) : (
									<span>{t('pick_a_date_range')}</span>
								))}
						</div>
						{cleareable && (date?.from || date?.to || (single && date)) && (
							<X
								className="ml-2 h-4 w-4 shrink-0 rounded-md p-0.5 text-lg opacity-50 duration-300 hover:bg-red-700 hover:text-white"
								onClick={clearOnChange}
							/>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" align="start" lengthTrigger={false}>
					<Calendar
						className="w-full"
						mode={single ? 'single' : 'range'}
						defaultMonth={date?.from}
						selected={date}
						onSelect={onSelect}
						numberOfMonths={numberOfMonths}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

import {Button} from '../ui/button'
import {Input} from '../ui/input'
import {useCallback} from 'react'

import {cn} from '@/lib/utils'

export default function CounterManager({counterSet, disabled = false, className, onChange}) {
	const [count, {increment, decrement, set}] = counterSet

	const execOnChange = useCallback(
		(value) => {
			if (typeof onChange === 'function') {
				onChange(value)
			}
		},
		[onChange],
	)

	const fnIncrement = useCallback(() => {
		increment()
		execOnChange(count + 1)
	}, [count, increment])

	const fnDecrement = useCallback(() => {
		decrement()
		execOnChange(count - 1)
	}, [count, decrement])

	const fnSet = useCallback(
		(e) => {
			const value = String(e?.target?.value)
			const conslusion = value == '0' ? 0 : Number(value.replace(/^0+/, ''))

			set(conslusion)
			execOnChange(conslusion)
			e.target.value = conslusion
		},
		[set],
	)

	return (
		<div className={cn('flex w-full items-center justify-center space-x-2', className)}>
			<Button
				variant="ghost"
				className="h-10 w-10 rounded-full text-center outline-hidden"
				onClick={fnDecrement}
				disabled={disabled}>
				-
			</Button>
			<Input
				tabIndex={0}
				value={count}
				onChange={(e) => fnSet(e)}
				className="w-full text-center"
				onFocus={(e) => e.target.select()}
				onKeyDown={(e) => {
					if (e.keyCode === 38 || e.keyCode === 40) {
						e.preventDefault()
					}
				}}
				disabled={disabled}
				type="number"></Input>
			<Button
				variant="ghost"
				className="h-10 w-10 rounded-full text-center outline-hidden"
				onClick={fnIncrement}
				disabled={disabled}>
				+
			</Button>
		</div>
	)
}

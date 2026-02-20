import Image from 'next/image'
import React from 'react'

import {cn} from '@/lib/utils'

export const LtlogoFull = () => {
	return (
		<div className="flex items-center justify-center rounded-md p-2">
			<Image
				src="/img/lt-logo-full.png"
				alt="logo"
				width={1050 * 0.3}
				height={162 * 0.3}
				className="rounded-md"></Image>
		</div>
	)
}

export const Ltlogo = ({className}) => {
	return (
		<div className={cn('flex items-center justify-center rounded-md p-2', className)}>
			<Image
				src="/img/lt-logo.png"
				alt="logo"
				width={380 * 0.17}
				height={380 * 0.17}
				className="rounded-md"></Image>
		</div>
	)
}

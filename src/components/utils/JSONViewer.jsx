'use client'

import {Button} from '../ui/button'
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover/popover'
import {FileJson} from 'lucide-react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

import {cn} from '@/lib/utils'

export function JSONViewer({...props}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="flex w-max space-x-2" variant="ghost">
					<span>
						<FileJson className={cn('h-4 w-4')} />
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent lengthTrigger={false} className="mx-2 w-max">
				<div className="h-[500px] w-[800px] overflow-auto rounded-md bg-slate-950 p-[20px] text-sm">
					<JsonView theme="atom" {...props} />
				</div>
			</PopoverContent>
		</Popover>
	)
}

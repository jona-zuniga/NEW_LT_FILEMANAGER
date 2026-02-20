'use client'

import { useUser } from '../providers/UserProvider'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover/popover'
import Icons from './Icons'

export default function UserAvatar({ collapsed = false, ...props }) {
	const userData = useUser()
	const ProfileInfo = () => {
		return (
			<div className="flex w-full flex-col gap-1 rounded-lg border border-slate-400 bg-white p-2 text-sm outline-hidden ring-0!">
				<div className="flex items-center justify-between space-x-2">
					<div className="font-bold text-slate-800">{userData.name}</div>
					<div className="mb-auto text-xs font-semibold text-slate-700">
						#{userData?.user}
					</div>
					{/* role */}
				</div>
				<div className="flex items-center gap-1 rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-800">
					<Icons.Misc.Wrench className="h-4 w-4" />
					{/* <div>Role</div> */}
					<div>{userData.role}</div>
				</div>
			</div>
		)
	}

	if (collapsed)
		return (
			<div className="flex w-full items-center justify-center p-2">
				{/* Profile symbol */}
				<Popover>
					<PopoverTrigger asChild>
						<div
							className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-slate-500 ring-0
                            transition-all hover:bg-slate-100 hover:text-slate-800 hover:ring-2
                        ">
							<div className="font-bold">{userData?.name?.charAt(0)}</div>
						</div>
					</PopoverTrigger>
					<PopoverContent side="right" asChild>
						<ProfileInfo />
					</PopoverContent>
				</Popover>
			</div>
		)

	return (
		<div className="mb-2 flex w-full items-center gap-2 border-t border-t-gray-200 p-2">
			{/* Profile symbol */}
			<div
				{...props}
				className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500">
				<div className="font-bold">{userData?.name?.charAt(0)}</div>
			</div>
			{/* Profile info */}
			<ProfileInfo />
		</div>
	)
}

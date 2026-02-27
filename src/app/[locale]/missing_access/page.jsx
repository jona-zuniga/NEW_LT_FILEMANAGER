'use client'

import {useMutation} from '@tanstack/react-query'
import React from 'react'

import {useLang} from '@/components/providers/I81nProvider'
import {Button} from '@/components/ui/button'
import Icons from '@/components/utils/Icons'

import {__login} from '@/services/login.service'

export default function MissingAccess() {
	const {lang} = useLang()

	const mutLogout = useMutation({
		mutationFn: __login.delete,
		onSuccess: () => {
			window.location.replace(`/${lang}/login`)
		},
		onError: (err) => {
			console.error(err)
		},
	})

	return (
		<div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0f1623] p-4">
			{/* Ambient glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 flex items-start justify-center">
				<div className="mt-25 h-150 w-150 rounded-full bg-blue-600/15 blur-[80px]" />
			</div>
			<div className="animate-in fade-in slide-in-from-bottom-5 relative z-10 w-full max-w-110 duration-500">
				<div className="flex flex-col items-center rounded-2xl border border-blue-500/20 bg-[#151d2e]/80 p-12 text-center shadow-2xl shadow-black/50 backdrop-blur-xl">
					<div className="mb-7 flex size-18 animate-pulse items-center justify-center rounded-full border border-blue-500/25 bg-blue-500/10">
						<Icons.Misc.Warning className="size-8 text-blue-400" />
					</div>
					<span className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-400 uppercase">
						Access Denied
					</span>
					<h1 className="mb-2.5 font-serif text-[22px] leading-snug font-bold tracking-tight text-slate-100">
						You don't have permission
						<br />
						to use this application
					</h1>
					<p className="mb-8 max-w-75 text-sm leading-relaxed text-slate-400">
						Please reach out to your administrator to request access.
					</p>
					<div className="mb-7 h-px w-full bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
					<Button
						variant="outline"
						onClick={mutLogout.mutate}
						className="shadow-[0_4px_14px_rgba(235, 37, 37, 0.2)] flex h-[42px] items-center gap-2 rounded-xl border border-red-500/30 bg-red-600/20 px-6 text-sm font-semibold tracking-wide text-red-300 transition-all duration-200 hover:-translate-y-px hover:border-blue-400/50 hover:bg-blue-600/35 hover:text-blue-200 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]">
						<Icons.Misc.Logout className="size-4" />
						Sign out
					</Button>
				</div>
			</div>
		</div>
	)
}

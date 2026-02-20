'use client'

import {useMutation} from '@tanstack/react-query'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import {useState} from 'react'

import {getFirstHref} from '@/components/navbar/getRoutes'
import {useLang, useT} from '@/components/providers/I81nProvider'
import {LtlogoFull} from '@/components/utils/LtLogo'
import {notifyLoaded} from '@/components/utils/Notifications'

import {ERR400} from '@/constants/responses'

import {__login} from '@/services/login.service'

const ThemeSwitcher = dynamic(() => import('@/components/navbar/theme-switcher'), {
	ssr: false,
})

export default function Page() {
	const t = useT()
	const {lang, changeLang} = useLang()
	const [pass, setPass] = useState('')
	const [user, setUser] = useState('')

	const [haveSuccess, setHaveSuccess] = useState(false)

	const mut = useMutation({
		mutationFn: __login.post,
		onSuccess: () => {
			setHaveSuccess(true)

			const firstHrefRoute = getFirstHref(lang, 'web')

			if (!firstHrefRoute) {
				return notifyLoaded(null, ERR400.status, 'cannot_access')
			}

			return window.location.replace(firstHrefRoute)
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		mut.mutate({user, pass})
	}

	return (
		<div className="h-screen w-screen bg-[#f5f5f9] text-black dark:bg-slate-900">
			<div className="flex h-full w-full items-center justify-center">
				<div className="h-max w-4/5 rounded-md bg-white p-2 shadow-md dark:bg-slate-800 sm:lg:w-2/5 2xl:w-1/5">
					<div className="h-full w-full">
						<div className="absolute right-2 top-2 flex items-center gap-2">
							<button
								className="text-gray-600"
								onClick={() => changeLang(lang === 'en' ? 'es' : 'en')}>
								{lang === 'en' ? '🇺🇸' : '🇲🇽'}
							</button>
							<ThemeSwitcher isOpen={false} />
						</div>
						<div className="flex h-1/4 w-full items-center justify-center border-b border-gray-300">
							<LtlogoFull />
						</div>
						<div className="h-3/4 w-full">
							<div className="h-1/4 w-full font-sans text-[#566a7f]">
								<div className="flex items-center justify-center">
									<h1 className="text-black-50 py-2 text-xl font-bold">
										{t('app_name')}
									</h1>
								</div>
								<div>
									<p className="text-md py-2 font-semibold">
										{t('please_sign_in_to_your_account')}
									</p>
								</div>
							</div>
							<div className="h-3/4 w-full">
								<div className="h-full w-full pt-2">
									<form
										id="loginForm"
										className="h-full w-full p-4 pt-2"
										onSubmit={handleSubmit}>
										<div className="mb-4 pb-1">
											<label
												htmlFor="username"
												className="mb-1 block text-xs font-medium text-gray-500">
												{t('username')}
											</label>
											<input
												type="text"
												id="username"
												name="username"
												value={user}
												onChange={(e) => setUser(e.target.value)}
												placeholder="Enter your username"
												className="w-full rounded-lg border px-3 py-2 focus:border-sky-500 focus:outline-hidden focus:ring-1 focus:ring-sky-500
													dark:border-slate-700 dark:bg-slate-800 dark:text-white
												"
											/>
										</div>
										<div className="relative mb-4 pb-1">
											<label
												htmlFor="password"
												className="mb-1 block text-xs font-medium text-gray-500">
												{t('password')}
											</label>
											<input
												type="password"
												id="password"
												name="password"
												value={pass}
												onChange={(e) => setPass(e.target.value)}
												placeholder="••••••••"
												className="w-full rounded-lg border px-3 py-2 pr-10 focus:border-sky-500 focus:outline-hidden focus:ring-1 focus:ring-sky-500
												dark:border-slate-700 dark:bg-slate-800 dark:text-white
												"
											/>
											<button
												type="button"
												className="absolute right-2 top-1/2 -translate-y-1/2 transform pt-5 text-gray-600"
												id="passwordRevealBtn">
												<i className="far fa-eye"></i>
											</button>
										</div>
										<div className="relative mb-1 hidden">
											<label className="relative inline-flex cursor-pointer items-center">
												<input
													type="checkbox"
													value="admin"
													id="checkAdmin"
													name="checkAdmin"
													className="peer sr-only"
												/>
												<div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-hidden peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
												<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
													{t('administrator')}
												</span>
											</label>
										</div>
										<button
											id="loginBtn"
											type="submit"
											className={clsx(
												'w-full rounded-lg bg-blue-500 px-4 py-2 text-white focus:outline-hidden focus:ring-1 ',
												{
													'bg-opacity-25': mut.isPending || haveSuccess,
													'hover:bg-blue-600 focus:border-sky-500 focus:ring-sky-500':
														!mut.isPending,
												},
											)}
											disabled={mut.isPending || haveSuccess}>
											{mut.isPending ? t('loading') : t('login')}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

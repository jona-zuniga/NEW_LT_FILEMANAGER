'use client'

import Icons from '@/components/utils/Icons'

const STEPS = [
	{label: 'Upload', step: 1},
	{label: 'Review', step: 2},
	{label: 'Save',   step: 3},
]

export default function StepperBarPS({currentStep = 1}) {
	return (
		<div className="flex items-center gap-0">
			{STEPS.map((s, i) => {
				const done   = currentStep > s.step
				const active = currentStep === s.step

				return (
					<div key={s.step} className="flex items-center gap-0">
						<div className="flex items-center gap-2">
							<div className={`
								flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all
								${done   ? 'bg-amber-500 text-white'                                       : ''}
								${active ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-400'             : ''}
								${!done && !active ? 'bg-slate-100 text-slate-400 dark:bg-slate-700'       : ''}
							`}>
								{done
									? <Icons.Misc.Check size={11} />
									: s.step
								}
							</div>
							<span className={`
								hidden text-[11px] font-semibold sm:block transition-all
								${done   ? 'text-amber-500'  : ''}
								${active ? 'text-amber-600'  : ''}
								${!done && !active ? 'text-slate-400' : ''}
							`}>
								{s.label}
							</span>
						</div>
						{i < STEPS.length - 1 && (
							<div className={`mx-2 h-px w-8 transition-all ${done ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
						)}
					</div>
				)
			})}
		</div>
	)
}

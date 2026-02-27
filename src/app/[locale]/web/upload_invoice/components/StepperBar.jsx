'use client'

import { useT } from '@/components/providers/I81nProvider'
import Icons from '@/components/utils/Icons'




export default function StepperBar({ currentStep = 1 }) {
  const t = useT()
const STEPS = [
  { id: 1, label: t('Upload'),  icon: Icons.FileManager.LuUpload },
  { id: 2, label: t('Review'),  icon: Icons.FileManager.LuClipboardList },
  { id: 3, label: t('Save'),    icon: Icons.FileManager.LuCircleCheck },

]
  return (
    <div className="flex w-full jus gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
      {STEPS.map((step, i) => {
        const Icon     = step.icon
        const isDone   = currentStep > step.id
        const isActive = currentStep === step.id

        return (
          <div key={step.id} className="flex flex-1 items-center gap-1">

            <div className={`
              flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-300
              ${isDone   ? 'bg-emerald-50 dark:bg-emerald-950' : ''}
              ${isActive ? 'bg-cyan-50 dark:bg-cyan-950'       : ''}
            `}>
              <div className={`
                flex h-5 w-5 shrink-0 items-center justify-center
                rounded-full text-[10px] font-bold transition-all duration-300
                ${isDone            ? 'bg-emerald-500 text-white'                          : ''}
                ${isActive          ? 'bg-cyan-500 text-white'                             : ''}
                ${!isDone && !isActive ? 'bg-slate-200 text-slate-400 dark:bg-slate-700'  : ''}
              `}>
                {isDone ? <Icons.FileManager.LuCircleCheck size={12} /> : step.id}
              </div>

              {/* Ícono — se oculta en móvil muy pequeño */}
              <Icons.FileManager.LuUpload
                size={13}
                className={`
                  hidden xs:block
                  ${isDone   ? 'text-emerald-500' : ''}
                  ${isActive ? 'text-cyan-500'    : ''}
                  ${!isDone && !isActive ? 'text-slate-400' : ''}
                `}
              />

              {/* Label — visible en sm en adelante */}
              <span className={`
                hidden sm:block whitespace-nowrap text-xs font-medium
                ${isDone   ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${isActive ? 'text-cyan-600 dark:text-cyan-400'       : ''}
                ${!isDone && !isActive ? 'text-slate-400'             : ''}
              `}>
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="mx-1 h-px flex-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            )}
          </div>
        )
      })}
    </div>
  )
}

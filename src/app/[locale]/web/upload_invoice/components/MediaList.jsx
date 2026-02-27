'use client'

import { useT } from '@/components/providers/I81nProvider'
import { LuFile, LuFileImage, LuReceiptText, LuTrash2, LuDatabaseZap } from 'react-icons/lu'
// Colores por tipo de slot
const TYPE_CONFIG = {
  invoice: {
    tagBg:    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    activeBg: 'border-cyan-300 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950',
  },
  other: {
    tagBg:    'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    activeBg: 'border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-950',
  },
}

// Ícono según extensión del archivo
function FileIcon({ name }) {
  const ext = name?.split('.').pop()?.toLowerCase()
  if (['png', 'jpg', 'jpeg', 'webp'].includes(ext))
    return <LuFileImage size={15} className="text-slate-500 dark:text-slate-400" />
  if (ext === 'pdf')
    return <LuReceiptText size={15} className="text-slate-500 dark:text-slate-400" />
  return <LuFile size={15} className="text-slate-500 dark:text-slate-400" />
}

// Fila de carga animada (skeleton)
function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800">
      <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="h-2.5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-2 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-4 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

function SectionLabel({ count }) {
const t= useT()

  return (
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
       { t('uploaded_files')}
      </p>
      {count > 0 && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
          {count}
        </span>
      )}
    </div>
  )
}

function formatSize(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaList({ files = [], activeFileId, onSelect, onDelete, loading = false }) {
const t = useT()
  if (loading) {
    return (
      <div className="flex flex-col gap-1.5">
        <SectionLabel count={0} />
        {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
      </div>
    )
  }

  if (!files.length) {
    return (
      <div className="flex flex-col gap-1.5">
        <SectionLabel count={0} />
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-6 dark:border-slate-700">
          <LuDatabaseZap size={24} className="text-slate-300 dark:text-slate-600" />
          <p className="text-xs text-slate-400">{t('No files yet')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <SectionLabel count={files.length} />

      {/*
        SCROLL:
        - En móvil: max-h-40 (muestra ~3 archivos antes de hacer scroll)
        - En escritorio: max-h-56 (muestra ~4 archivos)
        Puedes cambiar estos valores según tu diseño
      */}
      <div className="
        flex flex-col gap-1.5 overflow-y-auto pr-0.5
        max-h-40 md:max-h-56
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-300
        dark:[&::-webkit-scrollbar-thumb]:bg-slate-600
      ">
        {files.map((file) => {
          const cfg      = TYPE_CONFIG[file.slotKey] ?? TYPE_CONFIG.other
          const isActive = file.id === activeFileId

          return (
            <div
              key={file.id}
              onClick={() => onSelect?.(file)}
              className={`
                group flex cursor-pointer items-center gap-2 rounded-lg border p-2.5
                transition-all duration-150
                ${isActive
                  ? cfg.activeBg
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
                }
              `}
            >
              {/* Ícono del archivo */}
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-700">
                <FileIcon name={file.name} />
              </div>

              {/* Nombre y tamaño */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-100">
                  {file.customName ?? file.name}
                </p>
                <p className="font-mono text-[10px] text-slate-400">{formatSize(file.size)}</p>
              </div>

              {/* Tag del tipo */}
              <span className={`hidden flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:block ${cfg.tagBg}`}>
                {file.slotKey}
              </span>

              {/* Botón eliminar — visible siempre en móvil, hover en escritorio */}
              <button
                onClick={(e) => {
                  e.stopPropagation() // evita que también dispare onSelect
                  onDelete?.(file.id)
                }}
                className="
                  flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full
                  text-slate-400 transition-all
                  md:opacity-0 md:group-hover:opacity-100
                  hover:bg-red-100 hover:text-red-500
                  dark:hover:bg-red-950 dark:hover:text-red-400
                "
              >
                <LuTrash2 size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

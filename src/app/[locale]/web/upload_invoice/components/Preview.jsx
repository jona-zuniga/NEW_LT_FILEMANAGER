'use client'

import { LuDatabaseZap, LuDownload, LuEye } from 'react-icons/lu'

// Estado vacío — cuando no hay archivo seleccionado
function PreviewEmpty() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <LuDatabaseZap size={26} className="text-slate-400 dark:text-slate-500" />
      </div>
      <div className="px-4 text-center">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Select a file to preview
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          PDF and images supported
        </p>
      </div>
    </div>
  )
}

// Barra superior del visor
function PreviewToolbar({ fileName, onDownload }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <LuEye size={13} className="shrink-0 text-white/40" />
        {/* truncate evita que el nombre largo rompa el layout */}
        <span className="truncate font-mono text-xs text-white/60">{fileName}</span>
      </div>
      <button
        onClick={onDownload}
        title="Download"
        className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
      >
        <LuDownload size={13} />
      </button>
    </div>
  )
}

export default function Preview({ selectedFile }) {
  if (!selectedFile) return <PreviewEmpty />

  const { name, file, img } = selectedFile
  const ext     = name?.split('.').pop()?.toLowerCase()
  const isPdf   = ext === 'pdf'
  const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext)
  const src     = img || (file ? URL.createObjectURL(file) : null)

  const handleDownload = () => {
    if (!src) return
    const a    = document.createElement('a')
    a.href     = src
    a.download = name
    a.click()
  }

  return (
    <div className="flex w-full h-full flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <PreviewToolbar fileName={name} onDownload={handleDownload} />

      {/* Área del visor — ocupa todo el espacio restante */}
      <div className="flex flex-1 w-full items-center justify-center overflow-auto bg-slate-800 p-3 md:p-6">
        {isPdf && src && (
          <iframe
            src={src}
            title={name}
            className="h-full w-full rounded shadow-2xl"
            style={{ minHeight: '300px' }} // mínimo para que se vea en móvil
          />
        )}

        {isImage && src && (
          <img
            src={src}
            alt={name}
            className="max-h-full max-w-full rounded object-contain shadow-2xl"
          />
        )}

        {!isPdf && !isImage && (
          <div className="flex flex-col items-center gap-3 text-white/40">
            <LuDatabaseZap size={36} />
            <p className="text-center text-sm">Preview not available</p>
          </div>
        )}
      </div>
    </div>
  )
}

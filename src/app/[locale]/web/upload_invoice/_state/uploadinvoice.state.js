// _state/uploadinvoice.state.js
import {create} from 'zustand'

// ─────────────────────────────────────────────────────────────
// Estado inicial del formulario
// user ahora es un objeto completo { BADGE, EMPLOYEE, EMAIL }
// en lugar de id_notify_to_user y notify_to_user separados
// ─────────────────────────────────────────────────────────────
const INITIAL_ITEM = {
	vendors:  null,   // { ID, VENDORNO, COMPANY, CITY }
	invoice_no: '',
	day:      '',
	month:    '',
	year:     '',
	pono:     null,   // { ID, INFO }
	misc:     false,
	notes:    '',
	user:     null,   // { BADGE, EMPLOYEE, EMAIL } ← antes eran 2 campos separados
}

export const useUploadFileState = create((set) => ({

	// ── Formulario ──
	item: {...INITIAL_ITEM},

	// ── Archivos ──
	files:        [],
	selectedFile: null,

	// ── Errores de validación ──
	errorsFlatMap: {},

	// Devuelve el estado inicial — para resetear al cambiar vendor
	getInitialState: () => ({...INITIAL_ITEM}),

	// Actualiza cualquier campo del store
	update: (payload) => set((state) => ({...state, ...payload})),

	// Actualiza solo campos dentro de item
	updateItem: (payload) =>
		set((state) => ({
			item: {...state.item, ...payload},
		})),

	// Agrega archivos — invoice solo permite 1
	addFilesToSlot: (slotKey, newFiles) =>
		set((state) => {
			if (slotKey === 'invoice') {
				const sinInvoice = state.files.filter((f) => f.slotKey !== 'invoice')
				return {files: [...sinInvoice, ...newFiles]}
			}
			return {files: [...state.files, ...newFiles]}
		}),

	// Elimina archivo y actualiza selectedFile si era el activo
	removeFile: (id) =>
		set((state) => {
			const updated = state.files.filter((f) => f.id !== id)
			return {
				files:        updated,
				selectedFile:
					state.selectedFile?.id === id
						? updated[updated.length - 1] ?? null
						: state.selectedFile,
			}
		}),

	// Resetea todo
	reset: () =>
		set({
			item:          {...INITIAL_ITEM},
			files:         [],
			selectedFile:  null,
			errorsFlatMap: {},
		}),
}))
import {create} from 'zustand'

const INITIAL_ITEM = {
	vendors: null,
	pono: null,
	invoice_no: '',
	day: '',
	month: '',
	year: '',
}

export const useUploadPackslipState = create((set) => ({
	item: {...INITIAL_ITEM},
	files: [],
	selectedFile: null,
	errorsFlatMap: {},

	getInitialState: () => ({...INITIAL_ITEM}),

	update: (payload) => set((state) => ({...state, ...payload})),

	updateItem: (payload) => set((state) => ({item: {...state.item, ...payload}})),

	addFiles: (newFiles) => set((state) => ({files: [...state.files, ...newFiles]})),

	removeFile: (id) =>
		set((state) => {
			const updated = state.files.filter((f) => f.id !== id)
			return {
				files: updated,
				selectedFile:
					state.selectedFile?.id === id
						? updated[updated.length - 1] ?? null
						: state.selectedFile,
			}
		}),

	reset: () =>
		set({
			item: {...INITIAL_ITEM},
			files: [],
			selectedFile: null,
			errorsFlatMap: {},
		}),
}))

'use client'

import {produce} from 'immer'
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export const useSidebar = create(
	persist(
		(set, get) => ({
			isOpen: true,
			isHover: false,
			settings: {disabled: false, isHoverOpen: false},
			toggleOpen: () => {
				set({isOpen: !get().isOpen})
			},
			setIsOpen: (isOpen) => {
				set({isOpen})
			},
			setIsHover: (isHover) => {
				set({isHover})
			},
			getOpenState: () => {
				const state = get()
				return state.isOpen || (state.settings.isHoverOpen && state.isHover)
			},
			setSettings: (settings) => {
				set(
					produce((state) => {
						state.settings = {...state.settings, ...settings}
					}),
				)
			},
		}),
		{
			name: 'sidebar',
			storage: createJSONStorage(() => localStorage),
		},
	),
)

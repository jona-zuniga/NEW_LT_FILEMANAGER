import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
            /**
             * User generics
             */
            user: {},
            setUser: (newUser) => set({ user: newUser }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
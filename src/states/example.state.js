import { create } from 'zustand';

const useCustomersStore = create((set, get) => ({
    isEndUser: false,
    toogleIsEndUser: (bool) => {
        set({ isEndUser: bool !== undefined ? Boolean(bool) : !get().isEndUser });
    },
    setIsEndUser: (bool) => set({ isEndUser: Boolean(bool) }),
    customer: null,
    setCustomer: (newCustomer) => set({ customer: newCustomer }),
    endUser: null,
    setEndUser: (newEndUser) => set({ endUser: newEndUser }),
    PONumber: null,
    setPONumber: (newPONumber) => set({ PONumber: newPONumber }),
    getCurrentCustomer: () => {
        if (get().isEndUser) {
            return get().endUser;
        }

        return get().customer;
    },
}));

export default useCustomersStore;
import { create } from "zustand";

interface DropdownStore {
    dropdownId: string | undefined;
    setDropdownId: (dropdownId: string | undefined) => void;
}

interface MobileDropdownStore {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
    dropdownId: undefined,
    setDropdownId: (dropdownId) => set({ dropdownId }),
}));

export const useMobileDropdownStore = create<MobileDropdownStore>((set) => ({
    isOpen: false,
    setOpen: (isOpen) => set({ isOpen }),
}));

import { create } from "zustand";

interface DropdownStore {
    dropdownId: string | undefined;
    setDropdownId: (dropdownId: string | undefined) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
    dropdownId: undefined,
    setDropdownId: (dropdownId) => set({ dropdownId }),
}));

import { create } from "zustand";

interface UseDropDownProps {
    linksDropDown: number | null;
    userDropDown: boolean;
    setLinksDropDown: (value: number | null) => void;
    setUserDropDown: (value: boolean) => void;
}

export const useDropDown = create<UseDropDownProps>((set) => ({
    linksDropDown: null,
    userDropDown: false,
    setLinksDropDown: (value) => set({ linksDropDown: value }),
    setUserDropDown: (value) => set({ userDropDown: value }),
}));

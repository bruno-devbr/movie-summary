import { create } from "zustand";
import { User } from "../types/User";

interface UserProps {
    isLoggedIn: boolean;
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setUser?: (user: User | null) => void;
}

export const useUser = create<UserProps>((set) => ({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setUser: (user) => set({ user }),
}));

interface DropDownProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (value: boolean) => void;
}

export const useDropDown = create<DropDownProps>((set) => ({
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: (value) => set({ isMobileMenuOpen: value }),
}));

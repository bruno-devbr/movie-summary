import { create } from "zustand";
import { User } from "../types/User";

interface StoreProps {
    isLoggedIn: boolean;
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setUser?: (user: User | null) => void;
}

export const useUser = create<StoreProps>((set) => ({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setUser: (user) => set({ user }),
}));

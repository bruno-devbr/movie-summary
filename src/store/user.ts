import { UserInterface } from "@/types/login/user";
import { create } from "zustand";

export interface UserStoreInterface {
    user: UserInterface | null;
    updateUser: (user: UserInterface | null) => void;
}

export const useUserStore = create<UserStoreInterface>((set) => ({
    user: null,
    updateUser: (user) => set({ user }),
}));

import { create } from "zustand";
import { UserSchema } from "@/app/utils/types/User";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

interface StoreProps {
    isLoggedIn: boolean;
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setUser?: (user: User) => void; // opcional, se quiser atualizar o usuário
}

export const useUser = create<StoreProps>((set) => ({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setUser: (user) => set({ user }),
}));

import { create } from "zustand";
import { User } from "../types/user";

export type Toast = {
    type: "succes" | "error" | null;
    msg: string;
};

interface globalStoreProps {
    user: User;
    setUser: (newUser: User) => void;
    ts: Toast;
    setToast: (newToast: Toast) => void;
}

export const useGlobalStore = create<globalStoreProps>((set) => ({
    user: { avatar: "", id: "", username: "", ratings_itens: [] },
    setUser: (newUser) => set({ user: newUser }),
    ts: { type: null, msg: "" },
    setToast: (newToast) => set({ ts: newToast }),
}));

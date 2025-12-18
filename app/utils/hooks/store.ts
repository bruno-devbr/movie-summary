import { create } from "zustand";
import { User } from "../types/user";

export type Toast = {
    type: "success" | "error" | null;
    msg: string;
    id: Date;
};

interface globalStoreProps {
    user: User | null;
    setUser: (newUser: User | null) => void;
    ts: Toast;
    setToast: (newToast: Toast) => void;
}

export const useGlobalStore = create<globalStoreProps>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),
    ts: { type: null, msg: "" },
    setToast: (newToast) => set({ ts: newToast }),
}));

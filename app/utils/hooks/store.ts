import { create } from "zustand";

export type Toast = {
    type: "succes" | "error" | null;
    msg: string;
};

interface globalStoreProps {
    ts: Toast;
    setToast: (newToast: Toast) => void;
}

export const useGlobalStore = create<globalStoreProps>((set) => ({
    ts: { type: null, msg: "" },
    setToast: (newToast) => set({ toast: newToast }),
}));

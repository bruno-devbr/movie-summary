import { create } from "zustand";

export interface UserStatusinterface {
    isUserLoading: boolean;
    isUserError: boolean;
    updateIsUserLoading: (isUserLoading: boolean) => void;
    updateIsUserError: (isUserLoading: boolean) => void;
}

export const useUserStatus = create<UserStatusinterface>((set) => ({
    isUserError: false,
    isUserLoading: false,
    updateIsUserError: (isUserError) => set({ isUserError }),
    updateIsUserLoading: (isUserLoading) => set({ isUserLoading }),
}));

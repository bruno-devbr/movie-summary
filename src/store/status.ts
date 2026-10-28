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

export interface StatusInterface {
    isLoading: boolean;
    isError: boolean;
    updateIsLoading: (isLoading: boolean) => void;
    updateIsError: (isError: boolean) => void;
}

export const useStatus = create<StatusInterface>((set) => ({
    isError: false,
    isLoading: false,
    updateIsError: (isError) => set({ isError }),
    updateIsLoading: (isLoading) => set({ isLoading }),
}));

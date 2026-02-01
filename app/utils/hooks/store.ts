import { create } from "zustand";
import { User } from "../types/User";
import { FiltersProps, SORT_BY } from "../types/filters";

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

interface FiltesStoreProps extends FiltersProps {
    setPage: (value: number) => void;
    setYear: (value: number | null) => void;
    setSort: (value: SORT_BY) => void;
    setGenres: (value: number[] | null) => void;
    setVote: (value: number) => void;
    setIsOpen: (value: boolean) => void;

    params: FiltersProps;
    setParams: (value: FiltersProps) => void;
}

export const useFilters = create<FiltesStoreProps>((set) => ({
    page: 1,
    year: null,
    sort_by: SORT_BY.POPULARITY_DESC,
    genres: [],
    vote_average: 0,
    isOpen: false,

    setPage: (value) => set({ page: value }),
    setYear: (value) => set({ year: value }),
    setSort: (value) => set({ sort_by: value }),
    setGenres: (value) => set({ genres: value }),
    setVote: (value) => set({ vote_average: value }),
    setIsOpen: (value) => set({ isOpen: value }),

    params: {
        page: 1,
        year: null,
        sort_by: SORT_BY.POPULARITY_DESC,
        genres: [],
        vote_average: 0,
        isOpen: false,
    },
    setParams: (value) => set({ params: value }),
}));

interface GlobalStatesProps {
    loading: boolean;
    error: boolean;
    data: unknown;

    setLoading: (value: boolean) => void;
    setError: (value: boolean) => void;
    setData: (value: unknown) => void;
}

export const useGlobalStates = create<GlobalStatesProps>((set) => ({
    data: null,
    error: false,
    loading: false,

    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    setData: (value) => set({ data: value }),
}));

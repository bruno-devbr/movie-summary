import { useUserStatus } from "@/store/status";
import {
    type UserFunctionsInterface,
    type UserListsInteface,
    type UserMediaType,
} from "@/types/login/user";
import type { MediaListInterface } from "@/types/media";
import axios from "axios";
import { useCallback, useMemo } from "react";

export function useUserMediaLists() {
    const userFunctions = useUserFunctions();

    return {
        getFavorites: userFunctions.getFavorites,
        getWatchlist: userFunctions.getWatchlist,
        getLists: userFunctions.getLists,
    };
}

export function useUserFunctions(): UserFunctionsInterface {
    const { updateIsUserError, updateIsUserLoading } = useUserStatus();

    const runUserAction = useCallback(async <T>(request: () => Promise<T>) => {
        updateIsUserLoading(true);
        updateIsUserError(false);

        try {
            return await request();
        } catch {
            updateIsUserError(true);
            return undefined as T;
        } finally {
            updateIsUserLoading(false);
        }
    }, [updateIsUserError, updateIsUserLoading]);

    const fetchUserData = useCallback(async <T>(url: string): Promise<T | undefined> => {
        updateIsUserLoading(true);
        updateIsUserError(false);

        try {
            const { data } = await axios.get<T>(url);
            return data;
        } catch {
            updateIsUserError(true);
            return undefined;
        } finally {
            updateIsUserLoading(false);
        }
    }, [updateIsUserError, updateIsUserLoading]);

    return useMemo(() => ({
        addToWatchlist: (id: number, mediaType: UserMediaType = "movie") =>
            runUserAction(() =>
                axios.post("/api/user/watchlist", {
                    media_type: mediaType,
                    media_id: id,
                    watchlist: true,
                }),
            ),
        removeFromWatchlist: (id: number, mediaType: UserMediaType = "movie") =>
            runUserAction(() =>
                axios.delete("/api/user/watchlist", {
                    data: {
                        media_type: mediaType,
                        media_id: id,
                        watchlist: false,
                    },
                }),
            ),
        addToFavorites: (id: number, mediaType: UserMediaType = "movie") =>
            runUserAction(() =>
                axios.post("/api/user/favorites", {
                    media_type: mediaType,
                    media_id: id,
                    favorite: true,
                }),
            ),
        removeFromFavorites: (id: number, mediaType: UserMediaType = "movie") =>
            runUserAction(() =>
                axios.delete("/api/user/favorites", {
                    data: {
                        media_type: mediaType,
                        media_id: id,
                        favorite: false,
                    },
                }),
            ),
        createList: (
            name: string,
            description: string = "",
            language: "pt-BR" = "pt-BR",
        ) =>
            runUserAction(() =>
                axios.post("/api/user/list", {
                    name,
                    description,
                    language,
                }),
            ),
        deleteList: (listId: number) =>
            runUserAction(() => axios.delete(`/api/user/list/${listId}`)),
        getFavorites: async (page = 1) =>
            fetchUserData<MediaListInterface>(`/api/user/favorites?page=${page}`),
        getWatchlist: async (page = 1) =>
            fetchUserData<MediaListInterface>(`/api/user/watchlist?page=${page}`),
        getLists: async (page = 1) =>
            fetchUserData<UserListsInteface>(`/api/user/list?page=${page}`),
        addToList: (id: number, listId: number) =>
            runUserAction(() =>
                axios.post(`/api/user/list/${listId}/itens`, {
                    media_id: id,
                }),
            ),
        removeFromList: (id: number, listId: number) =>
            runUserAction(() =>
                axios.delete(`/api/user/list/${listId}/itens`, {
                    data: {
                        media_id: id,
                    },
                }),
            ),
        addReview: (
            id: number,
            value: number,
            mediaType: UserMediaType = "movie",
        ) =>
            runUserAction(() =>
                axios.post(`/api/${mediaType}/${id}/rating`, {
                    value,
                }),
            ),
        deleteReview: (id: number, mediaType: UserMediaType = "movie") =>
            runUserAction(() => axios.delete(`/api/${mediaType}/${id}/rating`)),
        logout: () => runUserAction(() => axios.delete("/api/auth")),
    }), [fetchUserData, runUserAction]);
}

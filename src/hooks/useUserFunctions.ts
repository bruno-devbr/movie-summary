import { useUserStatus } from "@/store/status";
import {
    type UserFunctionsInterface,
    type UserMediaType,
} from "@/types/login/user";
import axios from "axios";

export function useUserFunctions(): UserFunctionsInterface {
    const { updateIsUserError, updateIsUserLoading } = useUserStatus();

    const runUserAction = async <T>(request: () => Promise<T>) => {
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
    };

    return {
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
            runUserAction(() =>
                axios.delete(`/api/${mediaType}/${id}/rating`),
            ),
        logout: () =>
            runUserAction(() =>
                axios.delete("/api/auth"),
            ),
    };
}

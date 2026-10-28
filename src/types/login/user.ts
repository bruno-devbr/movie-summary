import { MediaListInterface } from "../media";

export interface UserInterface {
    avatar?: string;
    id: number;
    username: string;
    favorites?: MediaListInterface;
    watchlist?: MediaListInterface;
    lists?: UserListsInteface;
    userFunctions: UserFunctionsInterface;
}

export type UserMediaType = "movie" | "tv";

export interface UserListsInteface {
    page: number;
    results?:
        | {
              id: number;
              item_count: number;
              name?: string | undefined;
          }[]
        | undefined;
    total_pages: number;
    total_results: number;
}

export interface UserFunctionsInterface {
    addToWatchlist: (id: number, mediaType?: UserMediaType) => Promise<void>;
    removeFromWatchlist: (
        id: number,
        mediaType?: UserMediaType,
    ) => Promise<void>;
    addToFavorites: (id: number, mediaType?: UserMediaType) => Promise<void>;
    removeFromFavorites: (
        id: number,
        mediaType?: UserMediaType,
    ) => Promise<void>;
    createList: (
        name: string,
        description?: string,
        language?: "pt-BR",
    ) => Promise<void>;
    deleteList: (listId: number) => Promise<void>;
    addToList: (id: number, listId: number) => Promise<void>;
    removeFromList: (id: number, listId: number) => Promise<void>;
    addReview: (
        id: number,
        value: number,
        mediaType?: UserMediaType,
    ) => Promise<void>;
    deleteReview: (id: number, mediaType?: UserMediaType) => Promise<void>;
    logout: () => Promise<void>;
}

export interface GetUserDataInterface {
    avatar?:
        | {
              gravatar?:
                  | {
                        hash?: string | undefined;
                    }
                  | undefined;
              tmdb?:
                  | {
                        avatar_path?: string | undefined;
                    }
                  | undefined;
          }
        | undefined;
    id: number;
    iso_639_1?: string | undefined;
    iso_3166_1?: string | undefined;
    name?: string | undefined;
    include_adult: boolean;
    username?: string | undefined;
}

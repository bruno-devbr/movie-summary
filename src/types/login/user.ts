export interface UserInterface {
    avatar?: string;
    id: number;
    username: string;
    userFunctions?: UserFunctionsInterface;
}

export interface UserFunctionsInterface {
    addToWatchlist: (id: number) => void;
    removeFromWatchlist: (id: number) => void;
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
    addToList: (id: number, listId: number) => void;
    removeFromList: (id: number, listId: number) => void;
    addReview: (value: number) => void;
    deleteReview: (value: number) => void;
    logout: () => void;
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

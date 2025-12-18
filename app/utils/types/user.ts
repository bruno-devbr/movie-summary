export interface User {
    id: number;
    avatar: string | null;
    username: string;
    ratings_itens: string[];
    lists?: string[];
    favorites?: string[];
    watchList?: string[];
}

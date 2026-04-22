export interface ParamsProps {
    media_id: number;
    list_id: number;
    movie_id: number;
}

export interface ContextProps {
    params: Promise<ParamsProps>;
}

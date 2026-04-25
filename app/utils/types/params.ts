export interface ParamsProps {
    media_id: number;
    list_id: number;
    movie_id: number;
    tv_id: number;
    season_number: number;
    person_id: number;
    query: string;
}

export interface ContextProps {
    params: Promise<ParamsProps>;
}

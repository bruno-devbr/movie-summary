export interface SearchParamsProps {
    page: number;
    year?: number;
    genres: string;
    min_rate?: number;
    sort_by: SortByMovies | SortByTv;
}

export enum SortByMovies {
    POPULARITY_ASC = "popularity.asc",
    POPULARITY_DESC = "popularity.desc",
    VOTE_ASC = "vote_average.asc",
    VOTE_DESC = "vote_average.desc",
    DATE_ASC = "primary_release_date.asc",
    DATE_DESC = "primary_release_date.desc",
}

export enum SortByTv {
    POPULARITY_ASC = "popularity.asc",
    POPULARITY_DESC = "popularity.desc",
    VOTE_ASC = "vote_average.asc",
    VOTE_DESC = "vote_average.desc",
    FIRST_AIR_DATE_ASC = "first_air_date.asc",
    FIRST_AIR_DATE_DESC = "first_air_date.desc",
}

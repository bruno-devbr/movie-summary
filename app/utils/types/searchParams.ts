export interface SearchParamsProps {
    page: number;
    year: number | undefined;
    genres: string;
    min_rate: number | undefined;
    sort_by: SortBy;
}

export enum SortBy {
    POPULARITY_ASC = "popularity.asc",
    POPULARITY_DESC = "popularity.desc",
    VOTE_ASC = "vote_average.asc",
    VOTE_DESC = "vote_average.desc",
    DATE_ASC = "primary_release_date.asc",
    DATE_DESC = "primary_release_date.desc",
}

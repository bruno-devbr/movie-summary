export enum SORT_BY {
    POPULARITY_DESC = "popularity.desc",
    POPULARITY_ASC = "popularity.asc",
    VOTE_AVERAGE_DESC = "vote_average.desc",
    VOTE_AVERAGE_ASC = "vote_average.asc",
    PRIMARY_RELEASE_DATE_DESC = "primary_release_date.desc",
    PRIMARY_RELEASE_DATE_ASC = "primary_release_date.asc",
}

export interface FiltersProps {
    page: number;
    year: number | null;
    sort_by: SORT_BY;
    genres: number[] | null;
    vote_average: number;
    isOpen: boolean;
}

import { MovieSortBy, TvSortBy } from "./sort_by";

export type SortBy = MovieSortBy | TvSortBy;

export interface SearchParamsInterface<TSortBy extends SortBy = MovieSortBy> {
    page: number;
    year?: number;
    vote: number;
    genres: string;
    sort_by: TSortBy;
}

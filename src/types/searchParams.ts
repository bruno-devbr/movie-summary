import { SortBy } from "./sort_by";

export interface SearchParamsInterface {
    page: number;
    year?: number;
    vote: number;
    genres: string;
    sort_by: SortBy;
}

import { SORT_BY } from "./sort_by";

export interface SearchParamsProps {
    page: number;
    sort_by: SORT_BY;
    genres: string | undefined;
    vote: number | undefined;
    year: number | undefined;
}

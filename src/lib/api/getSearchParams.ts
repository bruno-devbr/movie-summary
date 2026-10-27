import { SearchParamsInterface } from "@/types/api/searchParams";
import { MovieSortBy, TvSortBy } from "@/types/api/sort_by";

type SortByOptions = typeof MovieSortBy | typeof TvSortBy;

export function getSearchParams(
    params: URLSearchParams,
): SearchParamsInterface<MovieSortBy>;

export function getSearchParams(
    params: URLSearchParams,
    sortByOptions: typeof TvSortBy,
): SearchParamsInterface<TvSortBy>;

export function getSearchParams(
    params: URLSearchParams,
    sortByOptions: SortByOptions = MovieSortBy,
): SearchParamsInterface<MovieSortBy | TvSortBy> {
    const year = getNumberParam(params, "year");
    const genres = getStringParam(params, "genres") ?? "";
    const requestedPage = getNumberParam(params, "page");
    const requestedVote = getNumberParam(params, "vote");
    const query = getStringParam(params, "query") ?? "";
    const sortBy =
        getSortByParam(params, sortByOptions) ?? sortByOptions.POPULARITY_DESC;

    const page =
        requestedPage !== undefined && requestedPage >= 1
            ? Math.floor(requestedPage)
            : 1;

    const vote =
        requestedVote !== undefined && requestedVote >= 0 && requestedVote <= 10
            ? requestedVote
            : 0;

    return {
        page,
        ...(year !== undefined && { year }),
        vote,
        genres,
        sort_by: sortBy,
        query,
    };
}

function getNumberParam(
    params: URLSearchParams,
    key: string,
): number | undefined {
    const value = params.get(key)?.trim();

    if (!value) {
        return undefined;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}

function getStringParam(
    params: URLSearchParams,
    key: string,
): string | undefined {
    const value = params.get(key)?.trim();
    return value || undefined;
}

function getSortByParam<TSortBy extends SortByOptions>(
    params: URLSearchParams,
    sortByOptions: TSortBy,
): MovieSortBy | TvSortBy | undefined {
    const value = params.get("sort_by");
    return (Object.values(sortByOptions) as (MovieSortBy | TvSortBy)[]).find(
        (sortBy) => sortBy === value,
    );
}

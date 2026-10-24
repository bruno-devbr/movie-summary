import { SearchParamsInterface } from "@/types/searchParams";
import { SortBy } from "@/types/sort_by";

export function getSearchParams(
    params: URLSearchParams,
): SearchParamsInterface {
    const year = getNumberParam(params, "year");
    const genres = getStringParam(params, "genres") ?? "";
    const requestedPage = getNumberParam(params, "page");
    const requestedVote = getNumberParam(params, "vote");
    const sortBy = getSortByParam(params) ?? SortBy.POPULARITY_DESC;

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

function getSortByParam(params: URLSearchParams) {
    const value = params.get("sort_by");
    return Object.values(SortBy).find((sortBy) => sortBy === value);
}

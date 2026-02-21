import { NextRequest } from "next/server";
import {
    SearchParamsProps,
    SortByMovies,
    SortByTv,
} from "../types/searchParams";

export function searchParams(req: NextRequest): SearchParamsProps {
    const s = req.nextUrl.searchParams;

    const getNum = (key: string) => Number(s.get(key));
    const getString = (key: string) => s.get(key);

    const DEFAULTS = SortByMovies.POPULARITY_ASC;

    const sortByValue = getString("sort_by");
    const validSortBy =
        Object.values(SortByMovies).includes(sortByValue as SortByMovies) ||
        Object.values(SortByTv).includes(sortByValue as SortByTv)
            ? (sortByValue as SortByMovies | SortByTv)
            : DEFAULTS;

    return {
        page: Math.max(1, getNum("page") || 1),
        year: getNum("year") || undefined,
        genres: getString("genres") || "",
        min_rate: getNum("min_rate") || undefined,
        sort_by: validSortBy,
    };
}

import { NextRequest } from "next/server";
import { SearchParamsProps, SortBy } from "../types/searchParams";

export function searchParams(req: NextRequest): SearchParamsProps {
    const s = req.nextUrl.searchParams;

    const getNum = (key: string) => Number(s.get(key));
    const getString = (key: string) => s.get(key);

    return {
        page: Math.max(1, getNum("page") || 1),
        year: getNum("year") || undefined,
        genres: getString("genres") || "",
        min_rate: getNum("min_rate") || undefined,
        sort_by: (getString("sort_by") as SortBy) || SortBy.POPULARITY_ASC,
    };
}

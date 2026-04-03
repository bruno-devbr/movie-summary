import { NextRequest } from "next/server";
import { SearchParamsProps } from "../types/searchParams";

export function getSearchParams(req: NextRequest): SearchParamsProps {
    return {
        page: getPage(req),
    };
}

function getPage(req: NextRequest) {
    const page = getItem<number>(req, "page", 1, Number);
    return !isNaN(page) && page < 1 ? 1 : page;
}

function getItem<T>(
    req: NextRequest,
    name: string,
    optValue: T,
    funct: (value: unknown) => T,
) {
    return funct(req.nextUrl.searchParams.get(name)) || optValue;
}

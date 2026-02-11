import { NextRequest } from "next/server";
import { SearchParamsProps } from "../types/searchParams";

// função que retorna os search params
export function searchParams(req: NextRequest): SearchParamsProps {
    return {
        // O isNaN garante que se a URL vier suja, ele volta pro padrão 1
        page: getSearchItem<number>(req, "page", 1, (v) => {
            const parsed = Number(v);
            return isNaN(parsed) || parsed < 1 ? 1 : parsed;
        }),
    };
}

// função que pega o search param e tipa ele
function getSearchItem<T>(
    req: NextRequest,
    item: string,
    defaultValue: T,
    parser?: (value: string | null) => T,
): T {
    const value = req.nextUrl.searchParams.get(item);
    return parser
        ? parser(value)
        : value === null
          ? defaultValue
          : (value as unknown as T);
}

import { NextRequest } from "next/server";
import { SearchParamsProps } from "../types/searchParams";
import { SORT_BY_MOVIES, SORT_BY_TV } from "../types/sort_by";

// função que retorna searchParams
export function getSearchParams(
    req: NextRequest,
    isTV?: boolean,
): SearchParamsProps {
    return {
        page: getPage(req),
        sort_by: getSortBy(req, isTV),
        genres: getGenres(req),
        vote: getVote(req),
        year: getYear(req),
    };
}

// retotna o page, caso de erros default é 1
function getPage(req: NextRequest) {
    const page = getItem<number>(req, "page", 1, Number) as number;
    return !isNaN(page) && page >= 1 ? page : 1;
}

// retorna a ordem, em caso de erros o padrao é popularidade decrecente
function getSortBy(req: NextRequest, isTV?: boolean) {
    const value = getItem<SORT_BY_MOVIES>(
        req,
        "sort_by",
        SORT_BY_MOVIES.POPULARITY_DESC,
    ) as SORT_BY_MOVIES;

    if (isTV) {
        if (value === SORT_BY_MOVIES.POPULARITY_ASC) {
            return SORT_BY_TV.YEAR_ASC;
        } else if (value === SORT_BY_MOVIES.DATE_DESC) {
            return SORT_BY_TV.YEAR_DESC;
        }
    }

    if (!Object.values(SORT_BY_MOVIES).includes(value)) {
        return SORT_BY_MOVIES.POPULARITY_DESC;
    }

    return value;
}

// retorna os generos, caso de erros fica indefinido
function getGenres(req: NextRequest) {
    const value = getItem<string>(req, "genres", "", String);
    const regex = /^\d+(,\s?\d+)*\s*$/;

    if (!regex.test(value)) return undefined;
    return value;
}

// retorna os votos minimos, caso de erro fica indefinido
function getVote(req: NextRequest) {
    const value = getItem<number>(req, "vote", 0, Number) as number;
    return !isNaN(value) && value > 0 && value <= 10 ? value : undefined;
}

// retorna o ano, caso de erro default é indefinido
function getYear(req: NextRequest) {
    const value = getItem<number>(req, "year", 0, Number) as number;
    return !isNaN(value) && value >= 1800 && value <= 2100 ? value : undefined;
}

// função que pega o item do searchParams, faz a tipagem, e o parser quando necessario
function getItem<T>(
    req: NextRequest,
    name: string,
    optValue: T,
    parser?: (value: unknown) => T,
) {
    const value = req.nextUrl.searchParams.get(name) || optValue;

    if (parser) {
        return parser(value);
    }

    return value;
}

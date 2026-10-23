import { SearchParamsInterface } from "@/types/searchParams";

export function getSearchParams(
    params: URLSearchParams,
): SearchParamsInterface {
    const page = validateParams(params, "page", 1, Number);

    return { page };
}

function validateParams<T>(
    params: URLSearchParams,
    key: string,
    defaultValue: T,
    parseFunct: (value: string) => T,
): T {
    const value = params.get(key);

    if (value === null) {
        return defaultValue;
    }

    return parseFunct(value);
}

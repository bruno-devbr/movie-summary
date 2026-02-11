import { NextRequest } from "next/server";
import { CookiesProps } from "../types/cookies";

// função utilitaria que retorna os cookies
export function cookiesStore(req: NextRequest): CookiesProps {
    return {
        id: getCookie(req, "account_id"),
        sessionId: getCookie(req, "tmdb_session"),
    };
}

// função que retorna o cookie do req
export function getCookie(req: NextRequest, item: string) {
    return req.cookies.get(item)?.value ?? "";
}

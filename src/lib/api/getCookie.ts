import { CookiesInterface } from "@/types/cookie";
import { AppError } from "@/lib/api/errors";
import { NextRequest } from "next/server";

export function getCookies(req: NextRequest): CookiesInterface {
    const session_id = req.cookies.get("session_id")?.value;
    const accountIdCookie = req.cookies.get("account_id")?.value;
    const account_id = Number(accountIdCookie);

    return {
        session_id: session_id ?? "",
        account_id: Number.isInteger(account_id) && account_id > 0 ? account_id : 0,
    };
}

export function getAccountCookies(req: NextRequest): CookiesInterface {
    const cookies = getCookies(req);

    if (!cookies.session_id || cookies.account_id <= 0) {
        throw new AppError(
            "Sessão inválida ou ausente.",
            "INVALID_SESSION",
            401,
        );
    }

    return cookies;
}

export function getSessionCookies(req: NextRequest): CookiesInterface {
    const cookies = getCookies(req);

    if (!cookies.session_id) {
        throw new AppError(
            "Sessão inválida ou ausente.",
            "INVALID_SESSION",
            401,
        );
    }

    return cookies;
}

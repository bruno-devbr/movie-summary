import { NextRequest } from "next/server";
import { CookiesProps } from "../types/cookies";

export function getCookies(req: NextRequest): CookiesProps {
    return {
        account_id: getItem(req, "account_id"),
        session_id: getItem(req, "session_id"),
    };
}

function getItem(req: NextRequest, name: string) {
    return req.cookies.get(name)?.value ?? "";
}

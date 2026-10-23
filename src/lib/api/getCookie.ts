import { CookiesInterface } from "@/types/cookie";
import { NextRequest } from "next/server";

export function getCookies(req: NextRequest): CookiesInterface {
    const session_id = req.cookies.get("session_id")?.value;
    const account_id = req.cookies.get("account_id")?.value;

    return {
        session_id: session_id ?? "",
        account_id: account_id ? Number(account_id) : 0,
    };
}

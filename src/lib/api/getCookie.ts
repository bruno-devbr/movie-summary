import { CookiesInterface } from "@/types/cookie";
import { NextRequest } from "next/server";

// função que retorna os cookies do request
export function getCookies(req: NextRequest): CookiesInterface {
    return {
        session_id: req.cookies.get("session_id")?.value ?? "",
        account_id: req.cookies.get("account_id")?.value ?? "",
    };
}

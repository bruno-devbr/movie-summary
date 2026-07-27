import { NextRequest } from "next/server";
import { CookiesInterface } from "@/types/api/cookies"

// função que retorna os cookies da api
export function getCookie(req: NextRequest): CookiesInterface {
    const session_id = req.cookies.get("session_id")?.value || ""
    const account_id = req.cookies.get("account_id")?.value || ""

    return {
        session_id,
        account_id
    }
}


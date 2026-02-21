import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// GET que pega os dados do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o api

        const rawData = await api.accountInfo(); // requisita os dados do usuario

        if (!rawData?.id) {
            throw new Error("Account ID not found");
        }

        const response = NextResponse.json(rawData, { status: 200 }); // prepara o response

        // poe o accont id nos cookies
        response.cookies.set("account_id", String(rawData.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });

        return response; // retorna o response
    } catch (error) {
        return getError(error);
    }
}

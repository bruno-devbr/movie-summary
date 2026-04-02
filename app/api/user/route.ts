import { NextRequest, NextResponse } from "next/server";
import { getApi, getError } from "@/app/utils/api";

// GET que retorna as informações dos usuarios
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api

        // cria o rawData e o response
        const rawData = await api.accountInfo();
        const response = NextResponse.json(rawData);

        // se o id nao existir retorna erro
        if (!rawData?.id) {
            throw new Error("Invalid account data");
        }

        // coloca o account_id nos cookies
        response.cookies.set({
            name: "account_id",
            value: String(rawData.id),
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        // rertorna o response
        return response;
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

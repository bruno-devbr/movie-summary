import { getApi, getError } from "@/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const rawData = await api.accountInfo(); // faz o fetch dos dados o usuario

        // valida caso o id do usuario seja invalido
        if (!rawData.id) {
            throw new Error("Invalid account data");
        }

        // cria o response passando o rawData
        const response = NextResponse.json(rawData);

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

        return response; // retorna o response com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

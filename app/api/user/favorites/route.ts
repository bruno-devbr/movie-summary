import { getApi, getError } from "@/app/utils/api/api";
import { getCookies } from "@/app/utils/api/getCookies";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria obj api

        const { account_id } = getCookies(req); // pega o account_id dos cookies
        const { page } = getSearchParams(req); // pega o page do search params

        // cria o rawData
        const rawData = await api.accountFavoriteMovies({
            language: "pt-BR",
            id: account_id,
            page,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData);
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

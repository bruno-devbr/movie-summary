import { getApi, getError } from "@/app/utils/api/api";
import { cookiesStore } from "@/app/utils/api/cookiesStore";
import { searchParams } from "@/app/utils/api/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que pega os itens favoritos do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o api

        const { page } = searchParams(req); // pega o page dos searchParams
        const { id } = cookiesStore(req); // pega o id dos cookies

        // requisita os favoritos do usuario passando os parametros
        const rawData = await api.accountFavoriteMovies({
            id,
            page,
            language: "pt-BR",
        });

        // retorna o rawData, com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

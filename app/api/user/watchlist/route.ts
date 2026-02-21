import { getApi, getError } from "@/app/utils/api/api";
import { cookiesStore } from "@/app/utils/api/cookiesStore";
import { searchParams } from "@/app/utils/api/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna a watchlist
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api

        // pega o id e page dos cookies e dos params
        const { page } = searchParams(req);
        const { id } = cookiesStore(req);

        // faz o fetch passando os parametros
        const rawData = await api.accountMovieWatchlist({
            language: "pt-BR",
            page,
            id,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

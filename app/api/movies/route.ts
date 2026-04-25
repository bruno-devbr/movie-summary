import { getApi, getError } from "@/app/utils/api/api";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os filmes filtrados
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // cria o obj api
        const params = getSearchParams(req); // pega todos os params dos searchParams

        // faz o fetch criando o rawData
        const rawData = await api.discoverMovie({
            primary_release_year: params.year,
            "vote_average.gte": params.vote,
            with_genres: params.genres,
            sort_by: params.sort_by,
            language: "pt-BR",
            page: params.page,
            region: "BR",
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

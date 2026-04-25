import { getApi, getError } from "@/app/utils/api/api";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que rotorna series filtradas
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // cria o obj api
        const params = getSearchParams(req, true); // pega os params do searchParams

        // faz o fetch criando o rawData
        const rawData = await api.discoverTv({
            first_air_date_year: params.year,
            "vote_average.gte": params.vote,
            with_genres: params.genres,
            sort_by: params.sort_by,
            watch_region: "BR",
            language: "pt-BR",
            page: params.page,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData);
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

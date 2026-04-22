import { getApi, getError } from "@/app/utils/api/api";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET dos filmes em breve
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // cria o obj api
        const { page } = getSearchParams(req); // pega o page dos searchParams

        // faz o fetch criando o rawData
        const rawData = await api.upcomingMovies({
            language: "pt-BR",
            region: "BR",
            page,
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamentos de erros
    }
}

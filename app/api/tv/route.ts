import { MovieBodyRequest, MovieResponse } from "@/app/utils/types/movies";
import { NextRequest, NextResponse } from "next/server";
import { api, getError } from "@/app/utils/api/api";

// POST que retorna os resultados por filtro
export async function POST(request: NextRequest) {
    try {
        // pega os filtros, e faz get passando os filtros
        const filters = (await request.json()) as MovieBodyRequest;
        const res = await api.get<MovieResponse>("/discover/movie", {
            params: filters,
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

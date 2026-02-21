import { getApi, getError } from "@/app/utils/api/api";
import { searchParams } from "@/app/utils/api/searchParams";
import { SortByMovies } from "@/app/utils/types/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna filmes filtrados
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // constroi o obj api
        const { genres, min_rate, page, sort_by, year } = searchParams(req); // pega todos os filtros dos Params

        // faz o fetch aplicando os filtros
        const rawData = await api.discoverMovie({
            sort_by: sort_by as SortByMovies,
            "vote_average.gte": min_rate,
            primary_release_year: year,
            with_genres: genres,
            language: "pt-BR",
            page: page,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

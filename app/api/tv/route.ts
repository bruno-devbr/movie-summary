import { getApi, getError } from "@/app/utils/api/api";
import { searchParams } from "@/app/utils/api/searchParams";
import { SortByTv } from "@/app/utils/types/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna series filtradas
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria obj api
        const { genres, min_rate, page, sort_by, year } = searchParams(req); // pega os filtros do searchParams

        // faz o fetch aplicando os filtros
        const rawData = await api.discoverTv({
            sort_by: sort_by as SortByTv,
            "vote_average.gte": min_rate,
            first_air_date_year: year,
            with_genres: genres,
            page: page,
        });

        // retorna rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

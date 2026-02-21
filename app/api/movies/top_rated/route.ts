import { getApi, getError } from "@/app/utils/api/api";
import { searchParams } from "@/app/utils/api/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET de filmes mais bem avaliados
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const { page } = searchParams(req); // pega o page do searchParams

        // faz o fetch passando page
        const rawData = await api.movieTopRated({
            language: "pt-BR",
            region: "BR",
            page,
        });

        // retorna rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna a lista de gêneros de filmes
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api

        // faz fetch para obter a lista de gêneros de filmes
        const rawData = await api.genreMovieList({
            language: "pt-BR",
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

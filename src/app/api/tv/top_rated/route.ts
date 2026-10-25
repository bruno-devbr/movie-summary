import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as séries mais bem avaliadas
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega a página dos searchParams

        // busca as séries mais bem avaliadas na API do TMDB
        const { data, error } = await tmdb.GET("/3/tv/top_rated", {
            params: {
                query: {
                    language: "pt-BR",
                    page,
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter as séries mais bem avaliadas.",
                "TOP_RATED_TV_FETCH_ERROR",
                502,
            );
        }

        // retorna as séries com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as séries exibidas hoje
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega a página dos searchParams

        // busca as séries exibidas hoje na API do TMDB
        const { data, error } = await tmdb.GET("/3/tv/airing_today", {
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
                "Não foi possível obter as séries exibidas hoje.",
                "AIRING_TODAY_TV_FETCH_ERROR",
                502,
            );
        }

        // retorna as séries com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

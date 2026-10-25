import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os próximos filmes a serem lançados
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega a página dos searchParams

        // busca os próximos filmes na API do TMDB
        const { data, error } = await tmdb.GET("/3/movie/upcoming", {
            params: {
                query: {
                    page,
                    language: "pt-BR",
                    region: "BR",
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os próximos filmes.",
                "UPCOMING_MOVIES_FETCH_ERROR",
                502,
            );
        }

        // retorna os filmes com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

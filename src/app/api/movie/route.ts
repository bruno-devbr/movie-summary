import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna filmes com base nos filtros da busca
export async function GET(req: NextRequest) {
    try {
        // pega os filtros dos searchParams
        const { genres, page, sort_by, vote, year } = getSearchParams(
            req.nextUrl.searchParams,
        );

        // busca os filmes na API do TMDB usando os filtros recebidos
        const { data, error } = await tmdb.GET("/3/discover/movie", {
            params: {
                query: {
                    with_genres: genres,
                    "vote_average.gte": vote,
                    primary_release_year: year,
                    sort_by,
                    page,
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os filmes.",
                "MOVIES_FETCH_ERROR",
                502,
            );
        }

        // retorna os filmes com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

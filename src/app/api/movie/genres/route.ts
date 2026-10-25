import { AppError, handleApiError } from "@/lib/api/errors";
import { tmdb } from "@/lib/tmdb";
import { NextResponse } from "next/server";

// GET que retorna os gêneros de filmes
export async function GET() {
    try {
        // busca os gêneros na API do TMDB
        const { data, error } = await tmdb.GET("/3/genre/movie/list", {
            params: {
                query: {
                    language: "pt-BR",
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os gêneros de filmes.",
                "MOVIE_GENRES_FETCH_ERROR",
                502,
            );
        }

        // retorna os gêneros com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

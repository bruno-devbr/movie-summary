import { AppError, handleApiError } from "@/lib/api/errors";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { ApiRouteContext } from "@/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados de um filme específico
export async function GET(req: NextRequest, { params }: ApiRouteContext) {
    try {
        // pega o ID do filme dos parâmetros da rota
        const { item_id } = await getParams({ params });

        // busca os dados do filme na API do TMDB
        const { data, error } = await tmdb.GET("/3/movie/{movie_id}", {
            params: {
                path: {
                    movie_id: item_id,
                },
                query: {
                    language: "pt-BR",
                    append_to_response: "videos,reviews,credits,similar",
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possivel obter os dados do filme",
                "MOVIE_FETCH_ERROR",
                502,
            );
        }

        // retorna os dados do filme com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { ApiRouteContext } from "@/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que retorna dados de um artista
export async function GET(req: NextRequest, { params }: ApiRouteContext) {
    try {
        // pega o ID do artista dos parâmetros da rota
        const { item_id } = await getParams({ params });

        // envia a avaliação para a API do TMDB
        const { data, error } = await tmdb.GET("/3/person/{person_id}", {
            params: {
                path: {
                    person_id: item_id,
                },
                query: {
                    language: "pt-BR",
                    append_to_response: "tv_credits,movie_credits",
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possivel adicionar uma avaliação",
                "ADD_RATE_ERROR",
                502,
            );
        }

        // retorna a resposta com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { ApiRouteContext } from "@/types/api/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados de uma série específica
export async function GET(req: NextRequest, { params }: ApiRouteContext) {
    try {
        // pega o ID da série dos parâmetros da rota
        const { item_id } = await getParams({ params });

        // busca os dados da série na API do TMDB
        const { data, error } = await tmdb.GET("/3/tv/{series_id}", {
            params: {
                path: {
                    series_id: item_id,
                },
                query: {
                    language: "pt-BR",
                    append_to_response: "credits,reviews,videos,similar",
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os dados da série.",
                "TV_FETCH_ERROR",
                502,
            );
        }

        // retorna os dados da série com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

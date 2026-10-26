import { AppError, handleApiError } from "@/lib/api/errors";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { ApiRouteContext } from "@/types/api/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados de uma temporada específica
export async function GET(req: NextRequest, { params }: ApiRouteContext) {
    try {
        // pega o ID da série e o número da temporada dos parâmetros da rota
        const { item_id, season_number } = await getParams({ params });

        // valida a presença do número da temporada
        if (season_number === undefined) {
            throw new AppError(
                "O número da temporada é obrigatório.",
                "MISSING_SEASON_NUMBER",
                400,
            );
        }

        // busca os dados da temporada na API do TMDB
        const { data, error } = await tmdb.GET(
            "/3/tv/{series_id}/season/{season_number}",
            {
                params: {
                    path: {
                        series_id: item_id,
                        season_number,
                    },
                    query: {
                        language: "pt-BR",
                    },
                },
            },
        );

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os dados da temporada.",
                "TV_SEASON_FETCH_ERROR",
                502,
            );
        }

        // retorna os dados da temporada com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

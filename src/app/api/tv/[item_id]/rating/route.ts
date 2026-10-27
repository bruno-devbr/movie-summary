import { AppError, handleApiError } from "@/lib/api/errors";
import { getBody } from "@/lib/api/getBody";
import { getSessionCookies } from "@/lib/api/getCookie";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { MediaRateSchema } from "@/schemas/media";
import { ApiRouteContext } from "@/types/api/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona ou atualiza a avaliação de uma série
export async function POST(req: NextRequest, { params }: ApiRouteContext) {
    try {
        // pega e valida o valor da avaliação enviado no corpo da requisição
        const { value } = await getBody(req, MediaRateSchema);

        // pega o ID da série dos parâmetros da rota e o ID da sessão dos cookies
        const { item_id } = await getParams({ params });
        const { session_id } = getSessionCookies(req);

        // envia a avaliação para a API do TMDB
        const { data, error } = await tmdb.POST("/3/tv/{series_id}/rating", {
            params: {
                path: {
                    series_id: item_id,
                },
                header: {
                    "Content-Type": "application/json",
                },
                query: {
                    session_id,
                },
            },
            body: {
                value,
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

// DELETE que remove a avaliação de uma série
export async function DELETE(req: NextRequest, { params }: ApiRouteContext) {
    try {
        const { item_id } = await getParams({ params });
        const { session_id } = getSessionCookies(req);

        const { data, error } = await tmdb.DELETE("/3/tv/{series_id}/rating", {
            params: {
                path: {
                    series_id: item_id,
                },
                query: {
                    session_id,
                },
            },
        });

        if (error) {
            throw new AppError(
                "Não foi possível remover a avaliação.",
                "RATING_UPDATE_ERROR",
                502,
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

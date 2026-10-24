import { AppError, handleApiError } from "@/lib/api/errors";
import { getAccountCookies } from "@/lib/api/getCookie";
import { getParams } from "@/lib/api/getParams";
import { tmdb } from "@/lib/tmdb";
import { MediaListItemRequestSchema } from "@/schemas/media";
import { ApiRouteContext } from "@/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item à lista
export async function POST(req: NextRequest, { params }: ApiRouteContext) {
    try {
        const { session_id } = getAccountCookies(req); // pega e valida os cookies da conta
        const { list_id } = await getParams({ params }); // pega e valida o id da lista

        const body = await req.json(); // cria o objeto body da requisição
        const result = MediaListItemRequestSchema.safeParse(body); // valida o body com o schema

        // se o body não for válido, cria um AppError
        if (!result.success) {
            throw new AppError(
                "Corpo da requisição invalido",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        const { media_id } = result.data; // pega o id da mídia validada

        // envia a requisição para adicionar o item usando a API do TMDB
        const { data, error } = await tmdb.POST("/3/list/{list_id}/add_item", {
            params: {
                path: {
                    list_id,
                },
                query: {
                    session_id,
                },
            },
            body: {
                media_id,
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível adicionar o item à lista",
                "TMDB_LIST_ITEM_ADD_ERROR",
                502,
            );
        }

        // retorna a confirmação da adição com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

// DELETE que remove um item da lista
export async function DELETE(req: NextRequest, { params }: ApiRouteContext) {
    try {
        const { session_id } = getAccountCookies(req); // pega e valida os cookies da conta
        const { list_id } = await getParams({ params }); // pega e valida o id da lista

        const body = await req.json(); // cria o objeto body da requisição
        const result = MediaListItemRequestSchema.safeParse(body); // valida o body com o schema

        // se o body não for válido, cria um AppError
        if (!result.success) {
            throw new AppError(
                "Corpo da requisição invalido",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        const { media_id } = result.data; // pega o id da mídia validada

        // envia a requisição para remover o item usando a API do TMDB
        const { data, error } = await tmdb.POST(
            "/3/list/{list_id}/remove_item",
            {
                params: {
                    path: {
                        list_id,
                    },
                    query: {
                        session_id,
                    },
                },
                body: {
                    media_id,
                },
            },
        );

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível remover o item da lista",
                "TMDB_LIST_ITEM_REMOVE_ERROR",
                502,
            );
        }

        // retorna a confirmação da remoção com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getAccountCookies } from "@/lib/api/getCookie";
import { getParams } from "@/lib/api/getParams";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { ApiRouteContext } from "@/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados de uma lista específica
export async function GET(req: NextRequest, { params }: ApiRouteContext) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega page dos searchParams
        const { list_id } = await getParams({ params }); // pega o id da lista dos params da rota

        // faz o fetch da lista usando a API do TMDB
        const { data, error } = await tmdb.GET("/3/list/{list_id}", {
            params: {
                path: {
                    list_id,
                },
                query: {
                    language: "pt-BR",
                    page,
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os dados da lista",
                "TMDB_LIST_FETCH_ERROR",
                502,
            );
        }

        // retorna os dados da lista com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

// DELETE que remove uma lista específica
export async function DELETE(req: NextRequest, { params }: ApiRouteContext) {
    try {
        const { session_id } = getAccountCookies(req); // pega e valida os cookies da conta
        const { list_id } = await getParams({ params }); // pega e valida o id da lista

        // envia a requisição para excluir a lista usando a API do TMDB
        const { data, error } = await tmdb.DELETE("/3/list/{list_id}", {
            params: {
                path: {
                    list_id,
                },
                query: {
                    session_id,
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possivel excluir a lista",
                "TMDB_LIST_DELETE_ERROR",
                502,
            );
        }

        // retorna a confirmação da exclusão com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // trata e retorna os erros da API
    }
}

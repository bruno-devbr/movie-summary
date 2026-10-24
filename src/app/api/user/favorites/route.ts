import { AppError, handleApiError } from "@/lib/api/errors";
import { getAccountCookies } from "@/lib/api/getCookie";
import { getBody } from "@/lib/api/getBody";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { MediaListRequestSchema } from "@/schemas/media";
import { NextRequest, NextResponse } from "next/server";

// GET que mostra os itens favoritos do usuario
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega page do searchParams
        const { session_id, account_id } = getAccountCookies(req); // pega e valida os cookies da conta

        // faz o fetch usando a api global
        const { data, error } = await tmdb.GET(
            "/3/account/{account_id}/favorite/movies",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        language: "pt-BR",
                        page,
                        session_id,
                    },
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os filmes favoritos.",
                "FAVORITES_FETCH_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // função de tratamento de erros
    }
}

// POST que adiciona um item aos favoritos
export async function POST(req: NextRequest) {
    try {
        const { session_id, account_id } = getAccountCookies(req); // pega e valida os cookies da conta

        const result = await getBody(req, MediaListRequestSchema);

        // se body nao estiver validado corretamente cria um AppError
        if (
            result.favorite === undefined ||
            result.watchlist
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, favorite } = result;

        // faz o fetch usando a api global
        const { data, error } = await tmdb.POST(
            "/3/account/{account_id}/favorite",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        session_id,
                    },
                },
                body: {
                    media_type,
                    media_id,
                    favorite,
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível adicionar o item aos favoritos.",
                "FAVORITES_FETCH_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // função de tratamento de erros
    }
}

// DELETE que remove um item aos favoritos
export async function DELETE(req: NextRequest) {
    try {
        const { session_id, account_id } = getAccountCookies(req); // pega e valida os cookies da conta

        const result = await getBody(req, MediaListRequestSchema);

        // se body nao estiver validado corretamente cria um AppError
        if (
            result.favorite === undefined ||
            result.watchlist
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, favorite } = result;

        // faz o fetch usando a api global
        const { data, error } = await tmdb.POST(
            "/3/account/{account_id}/favorite",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        session_id,
                    },
                },
                body: {
                    media_type,
                    media_id,
                    favorite,
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível remover o item dos favoritos.",
                "FAVORITES_FETCH_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // função de tratamento de erros
    }
}

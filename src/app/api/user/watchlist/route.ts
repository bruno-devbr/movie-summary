import { AppError, handleApiError } from "@/lib/api/errors";
import { getAccountCookies } from "@/lib/api/getCookie";
import { getBody } from "@/lib/api/getBody";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { MediaListRequestSchema } from "@/schemas/media";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os itens que estao na watchlist
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams);
        const { account_id, session_id } = getAccountCookies(req);

        const { data, error } = await tmdb.GET(
            "/3/account/{account_id}/watchlist/movies",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        language: "pt-BR",
                        session_id,
                        page,
                    },
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os itens da watchlist.",
                "WATCHLIST_FETCH_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST que adiciona um item a watchlist
export async function POST(req: NextRequest) {
    try {
        const { session_id, account_id } = getAccountCookies(req); // pega e valida os cookies da conta

        const result = await getBody(req, MediaListRequestSchema);

        // se body nao estiver validado corretamente cria um AppError
        if (
            result.watchlist !== true ||
            result.favorite !== undefined
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, watchlist } = result;

        const { data, error } = await tmdb.POST(
            "/3/account/{account_id}/watchlist",
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
                    media_id,
                    media_type,
                    watchlist,
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível adicionar o item a watchlist.",
                "WATCHLIST_UPDATE_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { account_id, session_id } = getAccountCookies(req); // pega e valida os cookies da conta

        const result = await getBody(req, MediaListRequestSchema);

        // se body nao estiver validado corretamente cria um AppError
        if (
            result.watchlist !== false ||
            result.favorite !== undefined
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, watchlist } = result;

        const { data, error } = await tmdb.POST(
            "/3/account/{account_id}/watchlist",
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
                    media_id,
                    media_type,
                    watchlist,
                },
            },
        );

        // se der algo erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível remover o item da watchlist.",
                "WATCHLIST_UPDATE_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

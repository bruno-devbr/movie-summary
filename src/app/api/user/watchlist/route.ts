import { AppError, handleApiError } from "@/lib/api/errors";
import { getCookies } from "@/lib/api/getCookie";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { MediaListRequestSchema } from "@/schemas/media";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os itens que estao na watchlist
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams);
        const { account_id, session_id } = getCookies(req);

        // verifica se algum id do usuario é invalido
        if (!session_id || !Number.isInteger(account_id) || account_id <= 0) {
            throw new AppError(
                "Sessão inválida ou ausente.",
                "INVALID_SESSION",
                401,
            );
        }

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
        const { session_id, account_id } = getCookies(req); // pega o account_id e session_id dos cookies

        // verifica se algum id do usuario é invalido
        if (!session_id || !Number.isInteger(account_id) || account_id <= 0) {
            throw new AppError(
                "Sessão inválida ou ausente.",
                "INVALID_SESSION",
                401,
            );
        }

        const body = await req.json(); // cria o obj body do request
        const result = MediaListRequestSchema.safeParse(body); // valida o body com o schema

        // se body nao estiver validado corretamente cria um AppError
        if (
            !result.success ||
            result.data.watchlist !== true ||
            result.data.favorite !== undefined
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, watchlist } = result.data;

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
        const { account_id, session_id } = getCookies(req); // pega os ids dos cookies

        // verifica se algum id do usuario é invalido
        if (!session_id || !Number.isInteger(account_id) || account_id <= 0) {
            throw new AppError(
                "Sessão inválida ou ausente.",
                "INVALID_SESSION",
                401,
            );
        }

        const body = await req.json(); // cria o obj body do request
        const result = MediaListRequestSchema.safeParse(body); // valida o body com o schema

        // se body nao estiver validado corretamente cria um AppError
        if (
            !result.success ||
            result.data.watchlist !== false ||
            result.data.favorite !== undefined
        ) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { media_type, media_id, watchlist } = result.data;

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

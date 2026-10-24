import { AppError, handleApiError } from "@/lib/api/errors";
import { getCookies } from "@/lib/api/getCookie";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { MediaListSchema } from "@/schemas/media";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as listas criadas pelo usuario
export async function GET(req: NextRequest) {
    try {
        const { account_id, session_id } = getCookies(req);
        const { page } = getSearchParams(req.nextUrl.searchParams);

        // verifica se algum id do usuario é invalido
        if (!session_id || !Number.isInteger(account_id) || account_id <= 0) {
            throw new AppError(
                "Sessão inválida ou ausente.",
                "INVALID_SESSION",
                401,
            );
        }

        const { data, error } = await tmdb.GET(
            "/3/account/{account_id}/lists",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        page,
                        session_id,
                    },
                },
            },
        );

        // se der algum erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter as listas.",
                "LISTS_FETCH_ERROR",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST que cria uma nova lista
export async function POST(req: NextRequest) {
    try {
        const { session_id } = getCookies(req);

        // verifica se existe uma sessao valida
        if (!session_id) {
            throw new AppError(
                "Sessão inválida ou ausente.",
                "INVALID_SESSION",
                401,
            );
        }

        const body = await req.json(); // cria o obj body do request
        const result = MediaListSchema.safeParse(body); // valida o body com o schema

        // se body nao estiver validado corretamente cria um AppError
        if (!result.success) {
            throw new AppError(
                "Corpo da requisição inválido.",
                "INVALID_REQUEST_BODY",
                400,
            );
        }

        // pega os valores do body
        const { description, language, name } = result.data;

        const { data, error } = await tmdb.POST("/3/list", {
            params: {
                query: {
                    session_id,
                },
            },
            body: {
                name,
                description,
                language,
            },
        });

        // se der algum erro de api cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível criar uma nova lista.",
                "LIST_CREATION_FAILED",
                502,
            );
        }

        // retorna data com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

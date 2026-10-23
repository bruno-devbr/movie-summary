import { AppError, handleApiError } from "@/lib/api/errors";
import { getCookies } from "@/lib/api/getCookie";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os dados do usuario
export async function GET(req: NextRequest) {
    try {
        const { session_id } = getCookies(req); // pega o session_id dos cookies

        // se session_id nao existir cria um AppError
        if (!session_id) {
            throw new AppError(
                "Sessão não encontrada.",
                "SESSION_NOT_FOUND",
                401,
            );
        }

        // faz o fetch usando a api global
        const { data, error } = await tmdb.GET("/3/account", {
            params: {
                query: {
                    session_id,
                },
            },
        });

        // se api dar erro cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possível obter os dados do usuário.",
                "USER_FETCH_ERROR",
                502,
            );
        }

        // se data.id nao existir cria um AppError
        if (!data?.id) {
            throw new AppError(
                "A API não retornou um ID de conta válido.",
                "INVALID_ACCOUNT_ID",
                502,
            );
        }

        const response = NextResponse.json(data); // cria o obj response

        // coloca o account_id nos cookies
        response.cookies.set("account_id", data.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 30,
        });

        return response; // retorna o response com status 200
    } catch (error) {
        return handleApiError(error); // função de tratamento de erros
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getCookies } from "@/lib/api/getCookie";
import { getBody } from "@/lib/api/getBody";
import { tmdb } from "@/lib/tmdb";
import { CreateSessionSchema } from "@/schemas/auth";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna o request_token temporário
export async function GET() {
    try {
        // Faz a requisição usando a API global da TMDB
        const { data, error } = await tmdb.GET("/3/authentication/token/new");

        // Verifica se a TMDB retornou um erro HTTP
        if (error) {
            throw new AppError(
                "Não foi possível gerar o token de autenticação.",
                "AUTH_TOKEN_ERROR",
                502,
            );
        }

        // Retorna os dados com status 200
        return NextResponse.json(data);
    } catch (error) {
        // Normaliza e retorna o erro
        return handleApiError(error);
    }
}

// POST que define o session_id do usuário
export async function POST(req: NextRequest) {
    try {
        const rawBody = await getBody(req, CreateSessionSchema);

        // Faz a requisição para criar a sessão na TMDB
        const { data, error } = await tmdb.POST(
            "/3/authentication/session/new",
            {
                body: rawBody,
            },
        );

        // Verifica se a TMDB retornou um erro HTTP
        if (error) {
            throw new AppError(
                "Não foi possível criar a sessão.",
                "AUTH_SESSION_ERROR",
                502,
            );
        }

        // Verifica se a resposta contém o session_id
        if (!data?.session_id) {
            throw new AppError(
                "A TMDB não retornou um identificador de sessão.",
                "AUTH_SESSION_ERROR",
                502,
            );
        }

        // Cria a resposta HTTP com os dados retornados
        const response = NextResponse.json(data);

        // Armazena o session_id em um cookie protegido
        response.cookies.set("session_id", data.session_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 30,
        });

        return response;
    } catch (error) {
        // Normaliza e retorna o erro
        return handleApiError(error);
    }
}

// DELETE que encerra a sessão do usuário
export async function DELETE(req: NextRequest) {
    try {
        // Obtém o session_id armazenado nos cookies
        const { session_id } = getCookies(req);

        // Verifica se existe uma sessão identificada pelo cookie
        if (!session_id) {
            throw new AppError(
                "Sessão não encontrada.",
                "SESSION_NOT_FOUND",
                401,
            );
        }

        // Envia o session_id para a TMDB encerrar a sessão
        const { data, error } = await tmdb.DELETE("/3/authentication/session", {
            body: { session_id },
        });

        // Verifica se a TMDB retornou um erro HTTP
        if (error) {
            throw new AppError(
                "Não foi possível encerrar a sessão.",
                "SESSION_DELETE_ERROR",
                502,
            );
        }

        // Confirma que a TMDB encerrou a sessão com sucesso
        if (!data?.success) {
            throw new AppError(
                "A TMDB não confirmou o encerramento da sessão.",
                "SESSION_DELETE_ERROR",
                502,
            );
        }

        // Cria a resposta HTTP com os dados retornados
        const response = NextResponse.json(data);

        // Remove o cookie que armazenava o identificador da sessão
        response.cookies.delete("session_id");

        // Remove o cookie que armazenava o identificador da conta
        response.cookies.delete("account_id");

        // Retorna a resposta com os cookies removidos
        return response;
    } catch (error) {
        // Normaliza e retorna o erro
        return handleApiError(error);
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// ========================
// Rota GET: cria request_token
// ========================
export async function GET() {
    try {
        const api = getApi();
        // Chama a API da TMDB para criar um request_token temporário
        const rawData = await api.requestToken();

        // Retorna a resposta JSON com sucesso
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // retorna erro formatado caso ocorra
    }
}

// ========================
// Rota POST: cria session_id
// ========================
export async function POST(req: NextRequest) {
    try {
        // pega o dado do corpo da requisição
        const { request_token } = await req.json();

        if (!request_token) {
            return NextResponse.json(
                { error: "request_token inexistente" },
                { status: 400 },
            );
        }

        // cria a objeto api
        const api = getApi();

        // injeta o token.
        api.token = {
            success: true,
            request_token: request_token,
        };

        // cria um session id
        const session_id = await api.retrieveSession();

        // Cria a resposta JSON
        const response = NextResponse.json({ ok: true }, { status: 200 });

        // Salva o session_id em cookie seguro e durável (30 dias)
        response.cookies.set("session_id", session_id, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return response;
    } catch (error) {
        return getError(error);
    }
}

// ========================
// Rota DELETE: logout / remove session_id
// ========================
export async function DELETE() {
    try {
        const api = getApi();

        // Cria resposta JSON de sucesso
        const response = NextResponse.json({ ok: true }, { status: 200 });

        // Remove cookies relacionados à sessão
        response.cookies.delete("session_id", { path: "/" });
        response.cookies.delete("account_id", { path: "/" });

        // Limpa session_id na instância da API
        api.sessionId = "";

        return response;
    } catch (error) {
        return getError(error); // retorna erro formatado caso ocorra
    }
}

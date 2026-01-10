import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

const api = getApi();

// ========================
// Rota GET: cria request_token
// ========================
export async function GET() {
    try {
        // Chama a API da TMDB para criar um request_token temporário
        const rawData = await api.requestToken();

        // Cria a resposta JSON com sucesso
        const response = NextResponse.json(
            { ok: rawData.success },
            { status: 200 }
        );

        // Salva o request_token em cookie seguro, httpOnly e com expiração
        response.cookies.set("request_token", rawData.request_token, {
            httpOnly: true, // impede acesso via JS do frontend
            path: "/", // cookie disponível em todas as rotas
            sameSite: "lax", // protege contra CSRF
            expires: new Date(rawData.expires_at), // expira conforme a API da TMDB
            secure: process.env.NODE_ENV === "production", // só em HTTPS
        });

        return response;
    } catch (error) {
        return getError(error); // retorna erro formatado caso ocorra
    }
}

// ========================
// Rota POST: cria session_id
// ========================
export async function POST(req: NextRequest) {
    try {
        // Lê o request_token do cookie
        const request_token = req.cookies.get("request_token")?.value;

        if (!request_token) {
            // Se não tiver token, retorna erro 400
            return NextResponse.json(
                { error: "request_token inexistente" },
                { status: 400 }
            );
        }

        // Chama a API da TMDB para criar o session_id após aprovação do token pelo usuário
        const session_id = await api.retrieveSession();

        // Cria a resposta JSON
        const response = NextResponse.json({ ok: true }, { status: 200 });

        // Salva o session_id em cookie seguro e durável (30 dias)
        response.cookies.set("session_id", session_id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 dias em segundos
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        // Remove o request_token do cookie, já não é mais necessário
        response.cookies.delete("request_token", { path: "/" });

        return response;
    } catch (error) {
        return getError(error); // retorna erro formatado caso ocorra
    }
}

// ========================
// Rota DELETE: logout / remove session_id
// ========================
export async function DELETE() {
    try {
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

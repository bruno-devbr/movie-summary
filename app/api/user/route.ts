import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Rota GET para obter informações da conta do usuário
export async function GET(req: NextRequest) {
    try {
        // Cria uma instância da API TMDB usando os cookies da requisição (session_id)
        const api = getApi(req);

        // Chama a API TMDB para buscar informações da conta do usuário logado
        const user = await api.accountInfo();

        // Cria a resposta JSON com os dados do usuário e status 200
        const response = NextResponse.json(user, { status: 200 });

        // Salva o ID da conta em cookie seguro, httpOnly, válido por 30 dias
        response.cookies.set("account_id", user.id, {
            httpOnly: true, // impede acesso via JS do frontend
            maxAge: 60 * 60 * 24 * 30, // duração de 30 dias em segundos
            path: "/", // cookie disponível em todas as rotas
            sameSite: "lax", // proteção básica contra CSRF
            secure: process.env.NODE_ENV === "production", // só envia cookie via HTTPS em produção
        });

        // Retorna a resposta para o cliente
        return response;
    } catch (error) {
        // Em caso de erro (ex: session_id inválido), usa getError para retornar resposta padronizada
        return getError(error);
    }
}

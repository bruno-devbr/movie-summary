import { SessionProps, TokenProps } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { api } from "@/app/utils/api";

// Função auxiliar para tratar erros
function getError(error: unknown) {
    // Se o erro for do axios, retorna a mensagem e o status apropriado
    if (error instanceof AxiosError) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 500 }
        );
    } else {
        // Para outros erros, retorna erro interno do servidor
        return NextResponse.json(
            { message: "erro interno do servidor" },
            { status: 500 }
        );
    }
}

// GET para criar um novo request token da TMDB
export async function GET() {
    try {
        // Faz a requisição para obter um novo request token
        const res = await api.get<TokenProps>("/authentication/token/new");
        // Retorna o token obtido com status 200
        return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error) {
        // Chama a função de tratamento de erros
        return getError(error);
    }
}

// POST para criar uma nova sessão usando o request token
export async function POST(request: NextRequest) {
    try {
        // Extrai o request_token do corpo da requisição
        const request_token = (await request.json()) as TokenProps;
        // Faz a requisição para criar uma nova sessão usando o token recebido
        const res = await api.post<SessionProps>(
            "/authentication/session/new",
            request_token
        );

        // Cria a resposta de sucesso
        const response = NextResponse.json(
            { message: "logado com sucesso" },
            { status: 200 }
        );

        // Define o cookie httpOnly com o session_id retornado pela API
        response.cookies.set({
            name: "session_id", // Nome do cookie
            value: res.data.session_id, // Valor do cookie (session_id)
            httpOnly: true, // Garante que o cookie não seja acessível via JavaScript
            path: "/", // Cookie disponível em toda a aplicação
        });

        // Retorna a resposta com o cookie setado
        return response;
    } catch (error) {
        // Chama a função de tratamento de erros
        return getError(error);
    }
}

// DELETE para deslogar o usuário e limpar a sessão
export async function DELETE(request: NextRequest) {
    try {
        // Obtém o valor do cookie 'session_id'
        const session_id = request.cookies.get("session_id")?.value;

        // Se não houver session_id, retorna 401
        if (!session_id) {
            return NextResponse.json(
                { message: "session_id não encontrado" },
                { status: 401 }
            );
        }

        // Chama a API da TMDB para deletar a sessão
        await api.delete("/authentication/session", {
            data: { session_id },
        });

        // Cria a resposta de sucesso
        const response = NextResponse.json(
            { message: "deslogado com sucesso" },
            { status: 200 }
        );

        // Limpa o cookie do session_id
        response.cookies.set({
            name: "session_id", // Nome do cookie a ser removido
            value: "", // Valor vazio
            path: "/", // Mesmo path do cookie original
        });

        // Retorna a resposta
        return response;
    } catch (error) {
        // Chama a função de tratamento de erros
        return getError(error);
    }
}

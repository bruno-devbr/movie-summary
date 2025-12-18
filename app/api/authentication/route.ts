import { NextRequest, NextResponse } from "next/server";
import { api, getError } from "@/app/utils/api/api";
import { SessionProps, TokenProps } from "@/app/utils/types/auth";

export async function GET() {
    try {
        // cria request_token na TMDB
        const res = await api.get<TokenProps>("/authentication/token/new");

        const { request_token, success } = res.data;

        if (!success || !request_token) {
            return NextResponse.json(
                { message: "Failed to create request token" },
                { status: 500 }
            );
        }

        // monta a URL de autenticação
        const authUrl = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.NEXT_PUBLIC_APP_URL}/approved`;

        // devolve só o necessário pro client
        return NextResponse.json({ authUrl }, { status: 200 });
    } catch (error) {
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

        response.cookies.set({
            name: "loggedIn",
            value: "true",
            path: "/",
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

        //limpa o cookie do account_id
        response.cookies.set({
            name: "account_id",
            value: "",
            path: "/",
        });

        response.cookies.set({
            name: "loggedIn",
            value: "false",
            path: "/",
        });

        // Retorna a resposta
        return response;
    } catch (error) {
        // Chama a função de tratamento de erros
        return getError(error);
    }
}

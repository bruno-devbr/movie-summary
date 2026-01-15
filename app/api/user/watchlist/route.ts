import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função que trata requisições GET para obter a watchlist do usuário
export async function GET(req: NextRequest) {
    try {
        // Inicializa a instância da API com base na requisição
        const api = getApi(req);

        // Obtém o número da página dos parâmetros da URL, padrão é 1
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        // Recupera o account_id dos cookies da requisição
        const account_id = req.cookies.get("account_id")?.value as string;

        // Se não houver account_id, retorna erro de autenticação
        if (!account_id) {
            return NextResponse.json(
                { message: "Authentication is required" },
                { status: 401 }
            );
        }

        // Chama a API para buscar a watchlist de filmes do usuário
        const watchlist = await api.accountMovieWatchlist({
            language: "pt-BR",
            page,
        });

        // Retorna a watchlist encontrada com status 200
        return NextResponse.json(watchlist, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna resposta de erro formatada
        return getError(error);
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função que trata requisições GET para obter os favoritos do usuário
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

        // Chama a API para buscar os filmes favoritos do usuário
        const favorites = await api.accountFavoriteMovies({
            id: account_id,
            language: "pt-BR",
            page,
        });

        // Retorna os favoritos encontrados com status 200
        return NextResponse.json(favorites, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna resposta de erro formatada
        return getError(error);
    }
}

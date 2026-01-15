// Importa funções utilitárias para chamada de API e tratamento de erros
import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função que trata requisições GET para filmes "em cartaz"
export async function GET(req: NextRequest) {
    try {
        // Inicializa a instância da API
        const api = getApi();
        // Obtém o parâmetro de página da URL, padrão 1
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        // Chama a API para buscar filmes em cartaz no Brasil, em português
        const rawData = await api.movieNowPlaying({
            language: "pt-Br",
            region: "BR",
            page,
        });

        // Retorna os dados em formato JSON com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna resposta padronizada de erro
        return getError(error);
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função handler para requisições GET
export async function GET(req: NextRequest) {
    try {
        // Inicializa a instância da API
        const api = getApi();
        // Obtém o parâmetro 'page' da URL, padrão 1 se não informado
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        // Chama o endpoint de filmes que estão por vir
        const rawData = await api.upcomingMovies({
            language: "pt-BR", // Define o idioma da resposta
            region: "BR", // Define a região para os resultados
            page, // Página de resultados
        });

        // Retorna os dados em formato JSON com status 200 (OK)
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna resposta padronizada de erro
        return getError(error);
    }
}

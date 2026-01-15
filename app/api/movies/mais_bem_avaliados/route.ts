import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função que lida com requisições GET para filmes mais bem avaliados
export async function GET(req: NextRequest) {
    try {
        // Obtém a instância da API personalizada
        const api = getApi();

        // Recupera o parâmetro 'page' da URL, padrão é 1 se não informado
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        // Faz a requisição para buscar filmes mais bem avaliados, usando idioma e região do Brasil
        const rawData = await api.movieTopRated({
            language: "pt-Br", // idioma português do Brasil
            region: "BR", // região Brasil
            page,
        });

        // Retorna os dados em formato JSON com status 200 (OK)
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro padronizada
        return getError(error);
    }
}

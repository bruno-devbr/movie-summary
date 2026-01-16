import { getApi, getError } from "@/app/utils/api/api";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para obter informações detalhadas de um filme específico
export async function GET(req: NextRequest, context: routeParamsProps) {
    try {
        const api = getApi(); // Obtém a instância da API (não requer autenticação)
        const { movie_id } = await context.params; // Extrai o ID do filme dos parâmetros da rota

        // Busca informações do filme, incluindo créditos, reviews, similares e vídeos
        const rawData = await api.movieInfo({
            id: movie_id,
            language: "pt-BR",
            append_to_response: "credits,reviews,similar,videos",
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

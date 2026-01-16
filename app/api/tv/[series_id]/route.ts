import { getApi, getError } from "@/app/utils/api/api";
import { RouteParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para obter informações detalhadas de uma série específica
export async function GET(req: NextRequest, context: RouteParamsProps) {
    try {
        const api = getApi(); // Obtém a instância da API (não requer autenticação)
        const { series_id } = await context.params; // Extrai o ID da série dos parâmetros da rota

        // Busca informações da série, incluindo créditos, reviews, similares e vídeos
        const rawData = await api.tvInfo({
            id: series_id,
            language: "pt-BR",
            append_to_response: "credits,videos,similar,reviews",
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

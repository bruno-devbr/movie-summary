import { getApi, getError } from "@/app/utils/api/api";
import { RouteParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para obter detalhes de uma pessoa específica (ator, diretor, etc)
export async function GET(req: NextRequest, context: RouteParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada
        const { person_id } = await context.params; // Extrai o ID da pessoa dos parâmetros da rota

        // Busca informações detalhadas da pessoa, incluindo créditos
        const rawData = await api.personInfo({
            id: person_id,
            append_to_response: "credits",
            language: "pt-BR",
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

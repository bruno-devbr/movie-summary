import { getApi, getError } from "@/app/utils/api/api";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para obter o estado da conta do usuário em relação a uma série (favorito, avaliação, etc)
export async function GET(req: NextRequest, context: routeParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada
        const { series_id } = await context.params; // Extrai o ID da série dos parâmetros da rota

        // Busca os estados da conta do usuário para a série
        const rawData = await api.movieAccountStates({
            id: series_id,
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

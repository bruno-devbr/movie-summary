import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { UserRateBodySchema } from "@/app/utils/types/userActions";
import { NextRequest, NextResponse } from "next/server";

// Função para atualizar a avaliação do usuário para uma série específico
export async function POST(req: NextRequest, context: routeParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada

        const { series_id } = await context.params; // Extrai o ID da série dos parâmetros da rota
        const rawBody = UserRateBodySchema.parse(await req.json()); // Valida e obtém o corpo da requisição

        // Atualiza a avaliação da série usando a API
        await api.tvRatingUpdate(
            {
                id: series_id,
                language: "pt-BR",
                value: rawBody.value,
            },
            setHeaders()
        );

        // Retorna sucesso
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

// Função para remover a avaliação do usuário para uma série específico
export async function DELETE(req: NextRequest, context: routeParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada
        const { series_id } = await context.params; // Extrai o ID da série dos parâmetros da rota

        // Remove a avaliação da série usando a API
        await api.tvRatingDelete(
            { id: series_id, language: "pt-BR" },
            setHeaders()
        );

        // Retorna sucesso
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

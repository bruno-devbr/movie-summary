import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { RouteParamsProps } from "@/app/utils/types/routeParams";
import { UserRateBodySchema } from "@/app/utils/types/userActions";
import { NextRequest, NextResponse } from "next/server";

// Função para atualizar a avaliação do usuário para um filme específico
export async function POST(req: NextRequest, context: RouteParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada

        const { movie_id } = await context.params; // Extrai o ID do filme dos parâmetros da rota
        const rawBody = UserRateBodySchema.parse(await req.json()); // Valida e obtém o corpo da requisição

        // Atualiza a avaliação do filme usando a API
        await api.movieRatingUpdate(
            {
                id: movie_id,
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

// Função para remover a avaliação do usuário para um filme específico
export async function DELETE(req: NextRequest, context: RouteParamsProps) {
    try {
        const api = getApi(req); // Obtém a instância da API autenticada
        const { movie_id } = await context.params; // Extrai o ID do filme dos parâmetros da rota

        // Remove a avaliação do filme usando a API
        await api.movieRatingDelete(
            { id: movie_id, language: "pt-BR" },
            setHeaders()
        );

        // Retorna sucesso
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { ListBodyActionsSchema } from "@/app/utils/types/listsSchema";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para tratar requisições POST na rota /api/user/lists/[list_id]/add
export async function POST(req: NextRequest, context: routeParamsProps) {
    try {
        // Obtém a instância da API personalizada, passando a requisição
        const api = getApi(req);
        // Extrai o parâmetro list_id da URL
        const { list_id } = await context.params;

        // Valida e extrai o media_id do corpo da requisição usando o schema
        const { media_id } = ListBodyActionsSchema.parse(await req.json());
        // Adiciona o item à lista especificada, utilizando headers customizados
        await api.createListItem(
            { media_id, id: list_id, language: "pt-BR" },
            setHeaders()
        );

        // Retorna uma resposta de sucesso em formato JSON com status 200 (OK)
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro padronizada
        return getError(error);
    }
}

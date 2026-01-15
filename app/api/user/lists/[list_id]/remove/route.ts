import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { ListBodyActionsSchema } from "@/app/utils/types/listsSchema";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para tratar requisições DELETE na rota /api/user/lists/[list_id]/remove
export async function DELETE(req: NextRequest, context: routeParamsProps) {
    try {
        // Obtém a instância da API personalizada, passando a requisição
        const api = getApi(req);
        // Extrai o parâmetro list_id da URL
        const { list_id } = await context.params;

        // Valida e extrai o media_id do corpo da requisição usando o schema
        const { media_id } = ListBodyActionsSchema.parse(await req.json());
        // Remove o item da lista especificada, utilizando headers customizados
        await api.removeListItem(
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

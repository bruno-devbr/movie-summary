import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { routeParamsProps } from "@/app/utils/types/routeParams";
import { NextRequest, NextResponse } from "next/server";

// Função para tratar requisições GET na rota /api/user/lists/[list_id]
export async function GET(req: NextRequest, context: routeParamsProps) {
    try {
        // Obtém a instância da API personalizada, passando a requisição
        const api = getApi(req);
        // Extrai o parâmetro list_id da URL
        const { list_id } = await context.params;

        // Busca as informações da lista usando o list_id e define o idioma como pt-BR
        const list = await api.listInfo({ id: list_id, language: "pt-BR" });
        // Retorna a resposta em formato JSON com status 200 (OK)
        return NextResponse.json(list, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro padronizada
        return getError(error);
    }
}

// Função para tratar requisições DELETE na rota /api/user/lists/[list_id]
export async function DELETE(req: NextRequest, context: routeParamsProps) {
    try {
        // Obtém a instância da API personalizada, passando a requisição
        const api = getApi(req);
        // Extrai o parâmetro list_id da URL
        const { list_id } = await context.params;

        // Remove a lista com o id especificado, utilizando headers customizados
        await api.deleteList({ id: list_id }, setHeaders());
        // Retorna uma resposta de sucesso em formato JSON com status 200 (OK)
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro padronizada
        return getError(error);
    }
}

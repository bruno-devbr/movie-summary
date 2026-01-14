import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { ListBodySchema } from "@/app/utils/types/listsSchema";
import { NextRequest, NextResponse } from "next/server";

// Função que lida com requisições GET para a rota de listas do usuário
export async function GET(req: NextRequest) {
    try {
        // Obtém uma instância da API personalizada, passando a requisição
        const api = getApi(req);

        // Lê o parâmetro 'page' da URL, convertendo para número; padrão é 1
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;

        // Busca as listas da conta do usuário na API, usando idioma pt-BR e a página informada
        const lists = await api.accountLists({ language: "pt-BR", page });

        // Retorna a resposta em JSON com status 200 (OK)
        return NextResponse.json(lists, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro formatada
        return getError(error);
    }
}

// Função que lida com requisições POST para a rota de listas do usuário
export async function POST(req: NextRequest) {
    try {
        // Obtém uma instância da API personalizada, passando a requisição
        const api = getApi(req);

        // Lê o corpo da requisição e valida usando o schema ListBodySchema
        const body = await req.json();
        const { description, language, name } = ListBodySchema.parse(body);

        // Cria uma nova lista na API, passando os dados e os headers necessários
        const rawData = await api.createList(
            { description, language, name },
            setHeaders()
        );

        // Retorna a resposta de sucesso em JSON com status 200 (OK)
        return NextResponse.json({ success: rawData.success }, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro formatada
        return getError(error);
    }
}

import { api, getError } from "@/app/utils/api/api";
import { SearchMultiResponse } from "@/app/utils/types/search";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { query: string };
};

// GET de resultados de pesquisa
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o query, searchParams, page do params e do request
        const { query } = await params;
        const searchParams = await request.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;

        // faz um get retornando um SearchMultiResponse
        const res = await api.get<SearchMultiResponse>(`search/multi`, {
            params: { query, language: "pt-BR", page },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

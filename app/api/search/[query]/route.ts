import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os resultados da pesquisa
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(); // cria o obj api

        const { query } = await getParams(context); // pega o query dos params
        const { page } = getSearchParams(req); // pega o page do searchParams

        // faz fetch criando o rawData
        const rawData = await api.searchMulti({
            language: "pt-BR",
            region: "BR",
            query,
            page,
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

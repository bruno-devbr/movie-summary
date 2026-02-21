import { getApi, getError } from "@/app/utils/api/api";
import { searchParams } from "@/app/utils/api/searchParams";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna resultados de busca
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api

        const { query } = await getParams(context); // pega query dos params
        const { page } = searchParams(req); // pega o número da página

        // faz fetch passando a query, idioma e página
        const rawData = await api.searchMulti({
            query,
            language: "pt-BR",
            page,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

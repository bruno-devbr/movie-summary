import { getApi, getError } from "@/app/utils/api/api";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET de series mais bem avaliadas
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // cria o obj api
        const { page } = getSearchParams(req); // pega page dos searchParams

        // faz o fetch criando rawData
        const rawData = await api.tvTopRated({
            language: "pt-BR",
            page,
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

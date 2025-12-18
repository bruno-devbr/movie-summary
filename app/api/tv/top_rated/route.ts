import { api, getError } from "@/app/utils/api/api";
import { SeriesResponse } from "@/app/utils/types/series";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as series mais bem avaliados
export async function GET(request: NextRequest) {
    try {
        // pega o searchParams e o page
        const searchParams = await request.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;

        // faz o get retornando SeriesResponse
        const res = await api.get<SeriesResponse>("/tv/top_rated", {
            params: { page, language: "pt-BR", region: "BR" },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

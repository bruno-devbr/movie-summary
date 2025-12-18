import { api, getError } from "@/app/utils/api/api";
import { SeriesResponse } from "@/app/utils/types/series";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as series em exibição hj
export async function GET(request: NextRequest) {
    try {
        // pega o searchParams e o page
        const searchParams = await request.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;

        // faz o get retornando SeriesResponse
        const res = await api.get<SeriesResponse>("/tv/airing_today", {
            params: { page, language: "pt-BR" },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

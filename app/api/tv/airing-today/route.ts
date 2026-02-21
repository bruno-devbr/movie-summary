import { getApi, getError } from "@/app/utils/api/api";
import { searchParams } from "@/app/utils/api/searchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as series em exibição
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const { page } = searchParams(req); // pega o page do SearchParams

        // faz o fetch passando o page
        const rawData = await api.tvAiringToday({
            language: "pt-BR",
            page,
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

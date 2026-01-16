import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função para obter as séries de TV mais bem avaliadas
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // Obtém a instância da API
        const page = Number(req.nextUrl.searchParams.get("page")) || 1; // Pega o número da página da query string

        // Busca as séries mais bem avaliadas na API
        const rawData = await api.tvTopRated({
            language: "pt-BR",
            page,
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

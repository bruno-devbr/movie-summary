import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função para buscar múltiplos tipos de mídia (filmes, séries, pessoas) por uma query
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // Obtém a instância da API
        const { searchParams } = req.nextUrl; // Obtém os parâmetros da query string

        const page = Number(searchParams.get("page")) || 1; // Página da busca
        const query = searchParams.get("query") as string; // Termo de busca

        // Se não houver termo de busca, retorna erro 400
        if (!query) {
            return NextResponse.json(
                { message: "A query is requested" },
                { status: 400 }
            );
        }

        // Realiza a busca na API para múltiplos tipos de mídia
        const rawData = await api.searchMulti({
            language: "pt-BR",
            region: "BR",
            query,
            page,
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

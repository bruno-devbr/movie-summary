import { getApi, getError } from "@/app/utils/api/api";
import { NextResponse } from "next/server";

// Função para obter a lista de gêneros de séries de TV
export async function GET() {
    try {
        const api = getApi(); // Obtém a instância da API

        // Busca os gêneros de séries na API
        const rawData = await api.genreTvList({
            language: "pt-BR",
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

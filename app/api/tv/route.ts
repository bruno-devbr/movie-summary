import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função para descobrir séries de TV com filtros (ano, nota, gêneros, etc)
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // Obtém a instância da API
        const searchParams = req.nextUrl.searchParams; // Obtém os parâmetros da query string

        const page = Number(searchParams.get("page")) || 1; // Página
        const year = Number(searchParams.get("year")) || undefined; // Ano de estreia
        const sort_by = (searchParams.get("sort_by") as string) || undefined; // Ordenação
        const vote = Number(searchParams.get("vote")) || undefined; // Nota mínima
        const genres = (searchParams.get("genres") as number[]) || undefined; // Gêneros

        // Busca séries de acordo com os filtros
        const rawData = await api.discoverTv({
            language: "pt-BR",
            page,
            first_air_date_year: year,
            sort_by,
            "vote_average.gte": vote,
            with_genres: genres,
        });

        // Retorna os dados obtidos
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Retorna erro formatado
        return getError(error);
    }
}

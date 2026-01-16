import { getApi, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

// Função que lida com requisições GET para busca personalizada de filmes
export async function GET(req: NextRequest) {
    try {
        // Obtém a instância da API personalizada, passando a requisição
        const api = getApi(req);
        const { searchParams } = req.nextUrl;

        // Recupera parâmetros da URL, com valores padrão se não informados
        const page = Number(searchParams.get("page")) || 1;
        const year = Number(searchParams.get("year")) || undefined;
        const sort_by = searchParams.get("sort_by") as string;
        const genres = searchParams.get("genres") as number[]; // gêneros dos filmes
        const vote_average =
            Number(searchParams.get("vote_average")) || undefined; // nota mínima

        // Faz a requisição para buscar filmes conforme filtros informados
        const rawData = await api.discoverMovie({
            language: "pt-BR", // idioma português do Brasil
            page, // página de resultados
            primary_release_year: year, // ano de lançamento
            region: "BR", // região Brasil
            sort_by, // ordenação
            "vote_average.gte": vote_average, // nota mínima
            with_genres: genres, // gêneros
        });

        // Retorna os dados em formato JSON com status 200 (OK)
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro padronizada
        return getError(error);
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// GET que retorna os itens pesquisados
export async function GET(req: NextRequest) {
    try {
        const { page, query } = getSearchParams(req.nextUrl.searchParams);

        if (!query) {
            throw new AppError(
                "Informe um termo para realizar a pesquisa.",
                "SEARCH_QUERY_REQUIRED",
                400,
            );
        }

        const { data, error } = await tmdb.GET("/3/search/multi", {
            params: {
                query: {
                    query,
                    language: "pt-BR",
                    page,
                },
            },
        });

        if (error) {
            throw new AppError(
                "Não foi possível realizar a pesquisa.",
                "SEARCH_FETCH_ERROR",
                502,
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}
import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os artistas populares
export async function GET(req: NextRequest) {
    try {
        const { page } = getSearchParams(req.nextUrl.searchParams); // pega page do search params

        // faz o fetch usando a api global
        const { data, error } = await tmdb.GET("/3/person/popular", {
            params: {
                query: {
                    language: "pt-BR",
                    page,
                },
            },
        });

        // se der algum erro na API, cria um AppError
        if (error) {
            throw new AppError(
                "Não foi possivel obter os dados dos artistas",
                "PEOPLE_FETCH_ERROR",
                502,
            );
        }

        // retorna a resposta com status 200
        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error); // função de tratamento de erros
    }
}

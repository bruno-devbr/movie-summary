import { AppError, handleApiError } from "@/lib/api/errors";
import { getAccountCookies } from "@/lib/api/getCookie";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { account_id, session_id } = getAccountCookies(req);
        const { page } = getSearchParams(req.nextUrl.searchParams);

        const { data, error } = await tmdb.GET(
            "/3/account/{account_id}/rated/movies",
            {
                params: {
                    path: {
                        account_id,
                    },
                    query: {
                        language: "pt-BR",
                        page,
                        session_id,
                    },
                },
            },
        );

        if (error) {
            throw new AppError(
                "Não foi possível obter os itens avaliados",
                "TMDB_RATED_ITEMS_FETCH_ERROR",
                502,
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

import { AppError, handleApiError } from "@/lib/api/errors";
import { getSearchParams } from "@/lib/api/getSearchParams";
import { tmdb } from "@/lib/tmdb";
import { TvSortBy } from "@/types/api/sort_by";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { genres, page, sort_by, vote, year } = getSearchParams(
            req.nextUrl.searchParams,
            TvSortBy,
        );

        const { data, error } = await tmdb.GET("/3/discover/tv", {
            params: {
                query: {
                    with_genres: genres,
                    "vote_average.gte": vote,
                    first_air_date_year: year,
                    sort_by,
                    page,
                },
            },
        });

        if (error) {
            throw new AppError(
                "Não foi possível obter as séries.",
                "TV_FETCH_ERROR",
                502,
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return handleApiError(error);
    }
}

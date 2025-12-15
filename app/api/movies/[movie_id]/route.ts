import { api, getError } from "@/app/utils/api";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { movie_id: string };
};

export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        const { movie_id } = await params;

        const res = await api.get<Movie>(`/movie/${movie_id}`, {
            params: {
                append_to_response: "credits,reviews,similar,videos",
                language: "pt-BR",
            },
        });

        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

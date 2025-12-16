import { api, getError } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { movie_id: string };
};

// GET de movie pelo id
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o movie_id do params
        const { movie_id } = params;

        // faz o get retornando um Movie
        const res = await api.get<Movie>(`/movie/${movie_id}`, {
            params: {
                append_to_response: "credits,reviews,similar,videos",
                language: "pt-BR",
            },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

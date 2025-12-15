import { api, getError } from "@/app/utils/api";
import { RateProps } from "@/app/utils/types/rate";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { movie_id: string };
};

// POST de enviar uma review
export async function POST(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o movie_id do params
        const { movie_id } = await params;

        // pega o body e o session_id do request e dos cookies
        const body = (await request.json()) as RateProps;
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // faz o post passando os parametros
        await api.post(`/movie/${movie_id}/rating`, body, {
            params: { session_id },
        });

        // retorna status 200
        return NextResponse.json(
            { message: "avaliação feita com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

// DELETE de remover avaliação
export async function DELETE(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o movie_id do params
        const { movie_id } = await params;

        // pega o session_id dos cookies
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // faz o delete passando os parametros
        await api.delete(`/movie/${movie_id}/rating`, {
            params: { session_id },
        });

        // retorna status 200
        return NextResponse.json(
            { message: "avaliação removida com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

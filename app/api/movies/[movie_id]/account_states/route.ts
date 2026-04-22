import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { MovieRatingSchema } from "@/app/utils/types/movies";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna todos os dados do usuario relacionado ao filme
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { movie_id } = await getParams(context); // pega o movie_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.movieAccountStates({
            language: "pt-BR",
            id: movie_id,
        });

        return NextResponse.json(rawData); // retorna rawData com status
    } catch (error) {
        return getError(error); // função função de tratamento de erros
    }
}

// POST que adiciona uma nota ao filme
export async function POST(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o bj api

        const { movie_id } = await getParams(context); // pega o movie_id dos params
        const { value } = MovieRatingSchema.parse(await req.json()); // pega value do body

        // faz o fetch criando o rawData
        const rawData = await api.movieRatingUpdate(
            {
                language: "pt-BR",
                id: movie_id,
                value,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função função de tratamento de erros
    }
}

// DELETE que remove a nota do usuario do filme
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { movie_id } = await getParams(context); // pega movie_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.movieRatingDelete(
            {
                id: movie_id,
                language: "pt-BR",
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função função de tratamento de erros
    }
}

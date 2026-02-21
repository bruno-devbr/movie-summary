import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ItemsRatingBodySchema } from "@/app/utils/types/items";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detalhes sobre um filme
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { movie_id } = await getParams(context); // pega movie_id dos params

        // faz fetch passando o id
        const rawData = await api.movieInfo({
            id: movie_id,
            language: "pt-BR",
            append_to_response: "credits",
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// POST que atualiza a avaliação de um filme
export async function POST(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { movie_id } = await getParams(context); // pega movie_id dos params

        const body = await req.json(); // obtém o corpo da requisição
        const { value } = ItemsRatingBodySchema.parse(body); // valida o corpo da requisição

        // faz fetch passando o id e seta os headers
        const rawData = await api.movieRatingUpdate(
            {
                language: "pt-BR",
                id: movie_id,
                value,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

// DELETE que remove a avaliação de um filme
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api
        const { movie_id } = await getParams(context); // pega movie_id dos params

        // faz fetch para deletar a avaliação
        const rawData = await api.movieRatingDelete(
            {
                id: movie_id, // id do filme
                language: "pt-BR", // idioma
            },
            setHeaders(), // define os cabeçalhos
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

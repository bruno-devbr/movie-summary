import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ItemsRatingBodySchema } from "@/app/utils/types/items";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detalhes sobre uma série
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { series_id } = await getParams(context); // pega series_id dos params

        // faz fetch passando o id
        const rawData = await api.tvInfo({
            id: series_id,
            language: "pt-BR",
            append_to_response: "credits",
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

// POST que atualiza a avaliação de uma série
export async function POST(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { series_id } = await getParams(context); // pega series_id dos params

        const body = await req.json(); // obtém o corpo da requisição
        const { value } = ItemsRatingBodySchema.parse(body); // valida o corpo da requisição

        // faz fetch passando o id e o valor da avaliação
        const rawData = await api.tvRatingUpdate(
            {
                language: "pt-BR",
                id: series_id,
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

// DELETE que remove a avaliação de uma series
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api
        const { series_id } = await getParams(context); // pega series_id dos params

        // faz fetch para deletar a avaliação
        const rawData = await api.tvRatingDelete(
            {
                id: series_id,
                language: "pt-BR",
            },
            setHeaders(), // define os cabeçalhos
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

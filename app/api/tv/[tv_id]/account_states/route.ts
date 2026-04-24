import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ItemRatingSchema } from "@/app/utils/types/items";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET das açoes do usuario sobre a serie
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { tv_id } = await getParams(context); // pega o tv_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.tvAccountStates({
            language: "pt-BR",
            id: tv_id,
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// POST que adiciona uma nota a serie
export async function POST(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api

        const { tv_id } = await getParams(context); // pega o tv_id dos params
        const { value } = ItemRatingSchema.parse(await req.json()); // pega o value do body

        // faz o fetch criando o rawData
        const rawData = await api.tvRatingUpdate(
            {
                language: "pt-BR",
                id: tv_id,
                value,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// DELETE que remove a nota da serie
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { tv_id } = await getParams(context); // pega o tv_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.tvRatingDelete(
            {
                language: "pt-BR",
                id: tv_id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item a lista do usuario
export async function POST(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id, media_id } = await getParams(context); // pega o list_id e media_id do params

        // faz o fetch criando o rawData
        const rawData = await api.createListItem(
            {
                id: list_id,
                media_id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// DELETE que remove um item a lista do usuario
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id, media_id } = await getParams(context); // pega o list_id e media_id do params

        // faz o fetch criando o rawData
        const rawData = await api.removeListItem(
            {
                id: list_id,
                media_id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item a lista
export async function POST(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id, media_id } = await getParams(context); // pega o list_id e media_id dos params

        // faz o fetch passando os ids
        const rawData = await api.createListItem(
            {
                id: list_id,
                media_id,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// DELETE que remove um item da lista
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id, media_id } = await getParams(context); // pega o list_id e media_id dos params

        // faz o fetch passando os ids
        const rawData = await api.removeListItem(
            {
                id: list_id,
                media_id,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

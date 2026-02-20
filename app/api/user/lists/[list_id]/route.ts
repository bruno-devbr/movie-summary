import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna a lista do usuario
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id } = await getParams(context); // pega o list id da rota

        // fetch na lista do usuario
        const rawData = await api.listInfo({
            id: list_id,
            language: "pt-BR",
        });

        // retorna rawData e status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// DELETE que deleta a lista criada
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id } = await getParams(context); // pega o list_id dos params

        // cria o rawData passando o list_id e retorna ele com status 200
        const rawData = await api.deleteList({ id: list_id }, setHeaders());
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

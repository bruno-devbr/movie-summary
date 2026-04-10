import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getCookies } from "@/app/utils/api/getCookies";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona itens a lista
export async function POST(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api

        const { account_id } = getCookies(req); // pega o account_id dos cookies
        const { media_id } = await getParams(context); // pega o media_id dos params

        // faz o fetch criando rawData
        const rawData = await api.accountFavoriteUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                favorite: true,
                id: account_id,
                media_id,
            },
            setHeaders(),
        );

        // retorna rawData com status 200
        return NextResponse.json(rawData);
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

// DELETE que remove itens da lista
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api

        const { account_id } = getCookies(req); // pega o account_id dos cookies
        const { media_id } = await getParams(context); // pega o media_id dos params

        // faz o fetch criando rawData
        const rawData = await api.accountFavoriteUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                favorite: false,
                id: account_id,
                media_id,
            },
            setHeaders(),
        );

        // retorna rawData com status 200
        return NextResponse.json(rawData);
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

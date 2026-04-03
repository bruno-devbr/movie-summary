import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getCookies } from "@/app/utils/api/getCookies";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item a watchlist
export async function POST(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api

        const { account_id } = getCookies(req); // pega o accont_id dos cookies
        const { media_id } = await getParams(context); // pega o media_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                watchlist: true,
                id: account_id,
                media_id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// DELETE que remove um item da watchlist
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api

        const { account_id } = getCookies(req); // pega o accont_id dos cookies
        const { media_id } = await getParams(context); // pega o media_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                watchlist: false,
                id: account_id,
                media_id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

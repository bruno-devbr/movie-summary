import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { cookiesStore } from "@/app/utils/api/cookiesStore";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item a watchlist
export async function POST(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api

        // pega o media_id e o id dos params e dos cookies
        const { media_id } = await getParams(context);
        const { id } = cookiesStore(req);

        // faz o fetch usando os parametros
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                watchlist: true,
                media_id,
                id,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// DELETE que remove um item da watchlist
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api

        // pega o media_id e o id dos params e dos cookies
        const { media_id } = await getParams(context);
        const { id } = cookiesStore(req);

        // faz o fetch usando os parametros
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                watchlist: false,
                media_id,
                id,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

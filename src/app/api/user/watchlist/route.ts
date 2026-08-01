import { getApi, getError, setHeaders, verifyAccountId } from "@/utils/api/api";
import { getCookie } from "@/utils/api/cookieStore";
import { MediaIdSchema } from "@/utils/schemas/mediaSchemas";
import { NextRequest, NextResponse } from "next/server";

//  GET que retorna os itens da watchlist do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const id = verifyAccountId(getCookie(req).account_id); // pega e valida o account_id dos cookies

        //  faz o fetch preparando o rawData
        const rawData = await api.accountMovieWatchlist({
            language: "pt-BR",
            id,
        });

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// POST que adiciona um item a watchlist
export async function POST(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const id = verifyAccountId(getCookie(req).account_id); // pega e valida o account_id dos cookies

        const body = await req.json(); // pega o body do request
        const media_id = MediaIdSchema.parse(body).media_id; // pega o media_id validando pelo schema

        // faz o fetch adicionando o item a watchlist
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                watchlist: true,
                media_id,
                id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// DELETE que remove um item dos favoritos
export async function DELETE(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const id = verifyAccountId(getCookie(req).account_id); // pega e valida o account_id dos cookies

        const body = await req.json(); // pega o body do request
        const media_id = MediaIdSchema.parse(body).media_id; // pega o media_id validando pelo schema

        // faz o fetch removendo o item a watchlist
        const rawData = await api.accountWatchlistUpdate(
            {
                media_type: "movie",
                language: "pt-BR",
                watchlist: false,
                media_id,
                id,
            },
            setHeaders(),
        );

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

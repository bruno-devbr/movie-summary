import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { cookiesStore } from "@/app/utils/api/cookiesStore";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// POST que adiciona um item aos favoritos
export async function POST(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api

        const { media_id } = await getParams(context); // pega o media_id dos params
        const { id } = cookiesStore(req); // pega o id dos cookies

        // faz o fetch passando os parametros e os headers
        const rawData = await api.accountFavoriteUpdate(
            {
                media_type: "movie",
                favorite: true,
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

// DELETE que remove um item aos favoritos
export async function DELETE(
    req: NextRequest,
    context: { params: ParamsProps },
) {
    try {
        const api = getApi(req); // cria o obj api

        const { media_id } = await getParams(context); // pega o media_id dos params
        const { id } = cookiesStore(req); // pega o id dos cookies

        // faz o fetch passando os parametros e os headers
        const rawData = await api.accountFavoriteUpdate(
            {
                media_type: "movie",
                favorite: false,
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

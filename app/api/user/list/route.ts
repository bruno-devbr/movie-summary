import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getCookies } from "@/app/utils/api/getCookies";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { ListBodySchema } from "@/app/utils/types/listSchema";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna as listas do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api

        const { account_id } = getCookies(req); // pega o account_id dos cookies
        const { page } = getSearchParams(req); // pega page do search params

        // faz o fetch criando rawData
        const rawData = await api.accountLists({
            id: account_id,
            page,
        });

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// POST que cria uma lista
export async function POST(req: NextRequest) {
    try {
        const api = getApi(req); // cria obj api

        const body = await req.json(); // cria o body
        const rawBody = ListBodySchema.parse(body); // valida o body com o schema

        const rawData = await api.createList(rawBody, setHeaders()); // faz o fetch criando o rawData

        return NextResponse.json(rawData, { status: 201 }); // retorna rawData com status 201
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

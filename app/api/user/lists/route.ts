import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { cookiesStore } from "@/app/utils/api/cookiesStore";
import { searchParams } from "@/app/utils/api/searchParams";
import { UserCreateListSchema } from "@/app/utils/types/listSchema";
import { NextRequest, NextResponse } from "next/server";

// GET que busca as listas do usuario
export async function GET(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api

        const { page } = searchParams(req); // pega o page do search params
        const { id } = cookiesStore(req); // pega o account id dos cookies

        // faz o fetch retornando as listas do usuario
        const rawData = await api.accountLists({
            id,
            page,
            language: "pt-Br",
        });

        // retorna o rawData e status 200
        return NextResponse.json({ rawData }, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// POST que cria uma lista
export async function POST(req: NextRequest) {
    try {
        const api = getApi(req); // cria o obj api
        const body = await req.json(); // cria o body

        // tipa o body usando o schema
        const { description, language, name } =
            UserCreateListSchema.parse(body);

        // faz o fetch na api passando os itens do body
        const rawData = await api.createList(
            {
                description,
                language,
                name,
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json({ rawData }, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

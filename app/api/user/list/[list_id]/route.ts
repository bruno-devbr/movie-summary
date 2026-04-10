import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { ContextProps } from "@/app/utils/types/params";
import axios from "axios";
import { ListsDetailResponse } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna a lista do usuario detalhada
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const { list_id } = await getParams(context); // pega dos params o list_id
        const { page } = getSearchParams(req); // pega o page dos search params

        // faz o fetch criando o res
        const res = await axios.get<ListsDetailResponse>(
            `https://api.themoviedb.org/3/list/${list_id}`,
            {
                ...setHeaders(),
                params: { page, language: "pt-BR" },
            },
        );

        return NextResponse.json(res.data); // retorna o res.data com status 200
    } catch (error) {
        return getError(error);
    }
}

// DELETE que apaga a lista do usuario
export async function DELETE(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id } = await getParams(context); // pega dos params o list_id

        // faz o fetch criando o rawData
        const rawData = await api.deleteList(
            {
                id: list_id,
                language: "pt-BR",
            },
            setHeaders(),
        );

        // retorna o rawData com status 200
        return NextResponse.json(rawData);
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

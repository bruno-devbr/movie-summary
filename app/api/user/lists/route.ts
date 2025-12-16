import { NextRequest, NextResponse } from "next/server";
import { api, getError } from "@/app/utils/api/api";
import {
    CreateListBody,
    CreateListResponse,
    ListResponse,
} from "@/app/utils/types/lists";

// GET para pegar todas as listas do usuario
export async function GET(request: NextRequest) {
    try {
        // pega todos os searchParams da url
        const { searchParams } = request.nextUrl;

        // pega o session_id e account_id dos cookies
        const session_id = request.cookies.get("session_id")?.value || "";
        const account_id = request.cookies.get("account_id")?.value as string;

        // pega page dos searchParams, caso nao exista vira 1
        const page = Number(searchParams.get("page")) || 1;

        // faz a requisição retornando ListResponse
        const res = await api.get<ListResponse>(
            `/account/${account_id}/lists?page=${page}&session_id=${session_id}`
        );

        // retorna os dados
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

// POST de criar uma nova lista
export async function POST(request: NextRequest) {
    try {
        //pega as caracteristicas vindo do request, e session_id dos cookies
        const body = (await request.json()) as CreateListBody;
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // faz o post retornando uma CreateListResponse
        const res = await api.post<CreateListResponse>(
            `/list?session_id=${session_id}`,
            body
        );

        // retorna o id da lista
        return NextResponse.json(
            { list_id: res.data.list_id },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

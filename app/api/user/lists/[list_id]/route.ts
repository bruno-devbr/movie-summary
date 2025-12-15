import { api, getError } from "@/app/utils/api";
import { UserList } from "@/app/utils/types/lists";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: Promise<{ list_id: string }>;
};

// GET da lista do usuario
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o list_id vindo do params, e searchParams do request
        const { list_id } = await params;
        const { searchParams } = request.nextUrl;

        // pega page do searchParams e faz o fetch
        const page = Number(searchParams.get("page")) || 1;
        const res = await api.get<UserList>(
            `/list/${list_id}?page=${page}&language=pt-BR`
        );

        // retorna os dados
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

// DELETE de deletar uma lista
export async function DELETE(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o list_id, e session_id vindo do params e dos cookies
        const { list_id } = await params;
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // faz o fetch
        await api.delete(`/list/${list_id}?session_id=${session_id}`);

        // retorna os dados
        return NextResponse.json(
            { message: "lista deletada com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

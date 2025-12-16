import { api, getError } from "@/app/utils/api/api";
import { UserListBody } from "@/app/utils/types/lists";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: Promise<{ list_id: string }>;
};

// POST de adicionar um item a lista de usuario
export async function POST(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o id da lista vindo do params
        const { list_id } = await params;

        // monta o body + pega o session_id dos cookies
        const body = (await request.json()) as UserListBody;
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // faz o post
        await api.post(
            `/list/${list_id}/add_item?session_id=${session_id}`,
            body
        );

        // retorna status 200
        return NextResponse.json(
            { message: "adicionado a lista" },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

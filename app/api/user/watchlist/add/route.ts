import { api, getError } from "@/app/utils/api/api";
import { ActionListBody } from "@/app/utils/types/lists";
import { NextRequest, NextResponse } from "next/server";

// POST de adicionar a watchlist do usuario
export async function POST(request: NextRequest) {
    try {
        // pega os cookies e body do request
        const cookies = await request.cookies;
        const body = (await request.json()) as ActionListBody;

        // pega o account_id e session_id dos cookies
        const account_id = cookies.get("account_id")?.value;
        const session_id = cookies.get("session_id")?.value || "";

        // faz o post enviando o body
        await api.post(
            `/account/${account_id}/watchlist?session_id=${session_id}`,
            body
        );

        // retorna status 200
        return NextResponse.json(
            { message: "adicionado a watchlist com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

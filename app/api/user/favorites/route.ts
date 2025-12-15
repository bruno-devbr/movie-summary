import { api, getError } from "@/app/utils/api";
import { ListResponse } from "@/app/utils/types/lists";
import { NextRequest, NextResponse } from "next/server";

// GET dos filmes e series favoritas do usuario
export async function GET(request: NextRequest) {
    try {
        // pega os cookies e o searchParams do request
        const cookies = await request.cookies;
        const searchParams = request.nextUrl.searchParams;

        // pega o account_id, session_id e page dos cookies e do searchParams
        const account_id = cookies.get("account_id")?.value;
        const session_id = cookies.get("session_id")?.value || "";
        const page = Number(searchParams.get("page")) || 1;

        // faz o get retornando uma ListResponse
        const { data } = await api.get<ListResponse>(
            `/account/${account_id}/favorite/movies`,
            { params: { session_id, page } }
        );

        // retorna o o data
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

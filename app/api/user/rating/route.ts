import { api, getError } from "@/app/utils/api/api";
import { Rating } from "@/app/utils/types/rate";
import { NextRequest, NextResponse } from "next/server";

// GET de avaliações do usuario
export async function GET(request: NextRequest) {
    try {
        // pega os cookies e o searchParams
        const cookies = await request.cookies;
        const searchParams = await request.nextUrl.searchParams;

        // os ids da conta e sessação e cria o page
        const session_id = cookies.get("session_id")?.value || "";
        const account_id = cookies.get("account_id")?.value as string;
        const page = Number(searchParams.get("page") || 1);

        // faz o get retornando Rating
        const res = await api.get<Rating>(
            `/account/${account_id}/rated/movies`,
            {
                params: { language: "pt-BR", page, session_id },
            }
        );

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

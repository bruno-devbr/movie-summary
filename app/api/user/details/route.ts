import { NextRequest, NextResponse } from "next/server";
import { AccountDetails } from "@/app/utils/types/account";
import { api, getError } from "@/app/utils/api";

export async function GET(request: NextRequest) {
    try {
        // Recupera o session_id salvo após a autenticação TMDB
        // O cast assume que o fluxo garante a existência do cookie
        const session_id = (await request.cookies.get("session_id")
            ?.value) as string;

        // Chamada autenticada à TMDB para buscar os dados da conta
        // O retorno é tipado como AccountDetails
        const res = await api.get<AccountDetails>(
            `/account?session_id=${session_id}`
        );

        // cria o response e seta o account_id nos cookies
        const response = NextResponse.json(res.data, { status: 200 });
        response.cookies.set({
            name: "account_id",
            value: res.data.id,
            httpOnly: true,
            path: "/",
        });

        // retorna o response
        return response;
    } catch (error) {
        // Delegação do tratamento de erro para o helper centralizado
        return getError(error);
    }
}

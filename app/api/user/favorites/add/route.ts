import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { UserActionsBodySchema } from "@/app/utils/types/userActions";
import { NextRequest, NextResponse } from "next/server";

// Função que trata requisições POST para adicionar um item aos favoritos do usuário
export async function POST(req: NextRequest) {
    try {
        // Inicializa a instância da API com base na requisição
        const api = getApi(req);

        // Valida e obtém o corpo da requisição
        const rawBody = UserActionsBodySchema.parse(await req.json());

        // Recupera o account_id dos cookies da requisição
        const account_id = req.cookies.get("account_id")?.value as string;

        // Se não houver account_id, retorna erro de autenticação
        if (!account_id) {
            return NextResponse.json(
                { message: "Authentication is required" },
                { status: 401 }
            );
        }

        // Chama a API para adicionar o item aos favoritos do usuário
        await api.accountFavoriteUpdate(
            {
                id: account_id,
                media_id: rawBody.media_id,
                media_type: rawBody.media_type,
                favorite: rawBody.favorites,
                language: "pt-BR",
            },
            setHeaders()
        );

        // Retorna sucesso
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        // Em caso de erro, retorna resposta de erro formatada
        return getError(error);
    }
}

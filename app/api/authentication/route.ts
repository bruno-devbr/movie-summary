import { getApi, getError } from "@/app/utils/api/api";
import { CreateSessionIdBodySchema } from "@/app/utils/types/loginSchemas";
import { NextRequest, NextResponse } from "next/server";

// GET que cria o request token
export async function GET() {
    try {
        const api = getApi();

        const rawData = await api.requestToken();
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

// POST que cria o session id do usuario
export async function POST(req: NextRequest) {
    try {
        const api = getApi();
        const body = await req.json();

        // O parse já valida a estrutura. Se falhar, vai direto para o catch(error)
        const { request_token } = CreateSessionIdBodySchema.parse(body);

        // @ts-expect-error: a lib nao criou uma maneira manual de adicionar o token, podemos usar api.token de maneira manual
        api.token = { request_token }; // adiciona o request token no objeto da api

        // Requisita o session id
        const sessionId = await api.retrieveSession();

        if (!sessionId) {
            throw new Error("Failed to create session");
        }

        // prepara o response
        const response = NextResponse.json({ success: true }, { status: 200 });

        // poe o id nos cookies
        response.cookies.set("tmdb_session", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 dias de persistência
        });

        return response;
    } catch (error) {
        return getError(error);
    }
}

// DELETE que desloga o usuario
export async function DELETE() {
    try {
        const response = NextResponse.json({ success: true }, { status: 200 }); // prepara o response
        response.cookies.delete("tmdb_session"); // retira o session id dos cookies
        response.cookies.delete("account_id"); // retira o account id dos cookies

        return response; // retorna o response
    } catch (error) {
        return getError(error);
    }
}

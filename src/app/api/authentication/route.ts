import { getApi, getError, setHeaders } from "@/utils/api/api";
import { SessionIdSchema, TokenSchema } from "@/utils/schemas/loginSchemas";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna request token
export async function GET() {
    try {
        const api = getApi(); // cria o obj api
        const rawData = await api.requestToken(); // faz o fetch criando o request token

        // retorna o request token com status 200
        return NextResponse.json({ request_token: rawData.request_token });
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// POST que cria o session_id
export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // pega o body da requisição
        const rawBody = TokenSchema.parse(body); // valida o body

        // faz a requsição direta pelo axios
        const res = await axios.post(
            "https://api.themoviedb.org/3/authentication/session/new",
            rawBody,
            setHeaders(),
        );

        // valida o rawData e cria o response
        const rawData = SessionIdSchema.parse(res.data);
        const response = NextResponse.json({ success: true });

        // coloca session_id nos cookies
        response.cookies.set({
            name: "session_id",
            value: rawData.session_id,
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return response; // retorna o response com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

// DELETE que apaga os cookies e desloga o usuario
export async function DELETE() {
    try {
        const response = NextResponse.json({ success: true }); // cria o response final

        // apaga os valores do account_id dos cookies
        response.cookies.set({
            name: "account_id",
            value: "",
            path: "/",
            maxAge: 0,
        });

        // apaga os valores de session_id dos cookies
        response.cookies.set({
            name: "session_id",
            value: "",
            path: "/",
            maxAge: 0,
        });

        return response; // retorna o response com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

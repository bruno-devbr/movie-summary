import { getApi, getError, setHeaders } from "@/app/utils/api/api";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
    SessionIdDataSchema,
    TokenBodySchema,
} from "@/app/utils/types/loginSchemas";

// GET que retorna o request_token
export async function GET() {
    try {
        const api = getApi(); //cria o obj api
        const rawData = await api.requestToken(); // cria o request_token

        // retorna token com status 200
        return NextResponse.json({ token: rawData.request_token });
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

// POST que cria o session_id
export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // prepara o body enviado
        const rawBody = TokenBodySchema.parse(body); // valida o body com o schema

        // faz o fetch usando a api original, por probelmas de lib
        const res = await axios.post(
            "https://api.themoviedb.org/3/authentication/session/new",
            rawBody,
            setHeaders(),
        );

        // valida o data criado, e cria o response
        const rawData = SessionIdDataSchema.parse(res.data);
        const response = NextResponse.json({ success: true });

        // coloca o session_id nos cookies
        response.cookies.set({
            name: "session_id",
            value: rawData.session_id,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        return response; // retorna o response
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

// DELETE que remove a sessão do usuário limpando os identificadores dos cookies
export async function DELETE() {
    try {
        const response = NextResponse.json({ success: true }); // cria o response

        // deleta o session_id dos cookies
        response.cookies.set({
            name: "session_id",
            value: "",
            path: "/",
            maxAge: 0,
        });

        // deleta o account_id dos cookies
        response.cookies.set({
            name: "account_id",
            value: "",
            path: "/",
            maxAge: 0,
        });

        return response; // retorna o response
    } catch (error) {
        return getError(error); // retorna erro personalizado
    }
}

/* 
logica beck end login
    deslogar user: {
        deleta todos os cookies do usuario
        session_id e account id

        accont id sereve para outras rotas de api e é importante, por isso esta nos cookies

        a rota retorna sucess
    }

*/

import { getApi, getError, setHeaders } from "@/app/utils/api";
import {
    SessionIdDataSchema,
    TokenBodySchema,
} from "@/app/utils/types/loginSchemas";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const api = getApi();
        const rawData = await api.requestToken();

        if (!rawData.success) {
            throw new Error("Failed to get request token");
        }

        return NextResponse.json({ token: rawData.request_token });
    } catch (error) {
        return getError(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const rawBody = TokenBodySchema.parse(body);

        const res = await axios.post(
            "https://api.themoviedb.org/3/authentication/session/new",
            rawBody,
            setHeaders(),
        );

        const rawData = SessionIdDataSchema.parse(res.data);
        const response = NextResponse.json({ success: true });

        response.cookies.set({
            name: "session_id",
            value: rawData.session_id,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });

        return response;
    } catch (error) {
        return getError(error);
    }
}

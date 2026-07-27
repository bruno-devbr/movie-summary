import { MovieDb } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./cookieStore";
import axios from "axios";

// função que retorna o obj api global
export function getApi(req?: NextRequest) {
    const api = new MovieDb(process.env.TMDB_API_KEY as string)
    
    if (req) {
        api.sessionId = getCookie(req).session_id
    }

    return api
}

// função de tratamento de erros
export function getError(error: unknown) {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500

        return NextResponse.json(
            {
                message: error.response?.data?.status_message ?? error.message ??
                    "Ocorreu um erro inesperado",
                status
            },
            { status }
        )
    }

    if (error instanceof Error) {
        return NextResponse.json(
            {
                message: error.message,
                status: 500
            },
            { status: 500 }
        )
    }

    return NextResponse.json(
        {
            message: "Ocorreu um erro inesperado",
            status: 500
        },
        { status: 500 }
    )
}
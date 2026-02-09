import { AxiosError } from "axios";
import { MovieDb } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";

// cria o obj da api usado na rota
export function getApi(req: NextRequest) {
    const api = new MovieDb(process.env.TMDB_API_KEY as string); // cria o api passando a key

    // se req existe poe o session id no api
    if (req) {
        const sessionId = req.cookies.get("tmdb_session")?.value as string;

        // se session id nao existe retorna um erro
        if (!sessionId) {
            throw new Error("session id is not found");
        }

        api.sessionId = sessionId;
    }

    return api; // retorna o api
}

// função global de erro de rota
export function getError(error: unknown) {
    // se o erro for do axios, retorna a msg do axios e retona status personalizado ou 400
    if (error instanceof AxiosError) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 400 },
        );
    }

    // se nao for do axios retorna msg e status default
    return NextResponse.json(
        { message: "internal server error" },
        { status: 500 },
    );
}

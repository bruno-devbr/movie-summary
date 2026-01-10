import { MovieDb } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";

// função que monta a api
export function getApi(req?: NextRequest) {
    const api = new MovieDb(process.env.TMDB_API_KEY as string);

    // caso o req exista, deifini o session_id
    if (req) {
        const session_id = req.cookies.get("session_id")?.value as string;
        if (session_id) api.sessionId = session_id;
    }

    return api;
}

// função de tratamento de erros
export function getError(error: unknown) {
    let status = 500;

    if (error instanceof Error) {
        const anyError = error as { status?: number };

        if (typeof anyError.status === "number") {
            status = anyError.status;
        }
    }

    return NextResponse.json({}, { status });
}

import { MovieDb } from "moviedb-promise";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// função que cria o obj api
export function getApi(req?: NextRequest) {
    const api = new MovieDb(process.env.TMDB_API_KEY as string); // cria o obj api
    const sessionId = req?.cookies.get("session_id")?.value; // pega o session_id dos cookies

    // se o session id existir, coloca no obj api
    if (sessionId) {
        api.sessionId = sessionId;
    }

    return api; // retorna obj api
}

// função de tratamento de erros
export function getError(error: unknown) {
    // erro de validação
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                message: "Invalid request data",
                issues: error.issues,
            },
            { status: 400 },
        );
    }

    // erro do axios
    if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;

        const message =
            error.response?.data?.status_message ||
            error.message ||
            "Request failed";

        return NextResponse.json({ message }, { status });
    }

    // erro genérico
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
    );
}

// função que seta os cabeçalhos na api
export function setHeaders(): AxiosRequestConfig {
    return {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.TMDB_READ_TOKEN as string,
        },
    };
}

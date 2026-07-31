import { MovieDb } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./cookieStore";
import axios, { AxiosRequestConfig } from "axios";
import { ZodError } from "zod";

// função que retorna o obj api global
export function getApi(req?: NextRequest) {
    const api = new MovieDb(process.env.TMDB_API_KEY as string);

    if (req) {
        const { session_id } = getCookie(req);
        api.sessionId = session_id;
    }

    return api;
}

export function setHeaders(): AxiosRequestConfig {
    return {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.TMDB_API_READ_TOKEN as string,
        },
    };
}

// função de tratamento de erros
export function getError(error: unknown) {
    // se for erro do Axios
    if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;

        return NextResponse.json(
            {
                message:
                    error.response?.data?.status_message ??
                    error.message ??
                    "Ocorreu um erro inesperado",
                status,
            },
            { status },
        );
    }

    // se for erro de validação do Zod
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                message: error.issues[0]?.message ?? "Dados inválidos",
                status: 400,
            },
            { status: 400 },
        );
    }

    // se erro da Api
    if (error instanceof Error) {
        return NextResponse.json(
            {
                message: error.message,
                status: 500,
            },
            { status: 500 },
        );
    }

    // se for erro default
    return NextResponse.json(
        {
            message: "Ocorreu um erro inesperado",
            status: 500,
        },
        { status: 500 },
    );
}

export function verifyAccountId(id: unknown) {
    const parsed = Number(id);

    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new Error("Invalid account data");
    }

    return parsed;
}

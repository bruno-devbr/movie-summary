import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

// base inteira da api
export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
        "Content-Type": "application/json",
    },
});

// Função auxiliar para tratar erros
export function getError(error: unknown) {
    // Se o erro for do axios, retorna a mensagem e o status apropriado
    if (error instanceof AxiosError) {
        return NextResponse.json(
            { message: error.message },
            { status: error.response?.status || 500 }
        );
    } else {
        // Para outros erros, retorna erro interno do servidor
        return NextResponse.json(
            { message: "erro interno do servidor" },
            { status: 500 }
        );
    }
}

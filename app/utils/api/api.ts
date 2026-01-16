import { MovieDb } from "moviedb-promise";
import { NextRequest, NextResponse } from "next/server";

// Função que instancia e configura a API do TMDb
export function getApi(req?: NextRequest) {
    // Cria uma nova instância da API usando a API key do .env
    const api = new MovieDb(process.env.TMDB_API_KEY as string);

    // Se houver uma requisição, tenta obter o session_id dos cookies
    if (req) {
        const session_id = req.cookies.get("session_id")?.value as string;
        if (session_id) api.sessionId = session_id; // Define o session_id na instância da API
    }

    return api; // Retorna a instância configurada
}

// Função utilitária para tratamento de erros e resposta padronizada
export function getError(error: unknown) {
    let status = 500; // Status padrão

    if (error instanceof Error) {
        const anyError = error as { status?: number };

        // Se o erro possuir status, utiliza ele na resposta
        if (typeof anyError.status === "number") {
            status = anyError.status;
        }
    }

    // Retorna resposta JSON vazia com o status apropriado
    return NextResponse.json({}, { status });
}

export function setHeaders(): AxiosRequestConfig {
    return {
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
        },
    };
}

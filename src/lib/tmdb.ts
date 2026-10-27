import createClient from "openapi-fetch";
import type { paths } from "@/types/api/tmdb";
import { AppError } from "@lib/api/errors";

const token = process.env.TMDB_ACCESS_TOKEN; // define o token

// verifica se o token existe, caso não passa um appError
if (!token) {
    throw new AppError(
        "A configuração da API está incompleta.",
        "INTERNAL_ERROR",
        500,
    );
}

// cria a constante global de api
export const tmdb = createClient<paths>({
    baseUrl: "https://api.themoviedb.org",
    headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
    },
});

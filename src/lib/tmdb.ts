import createClient from "openapi-fetch";
import type { paths } from "@/types/tmdb";

const token = process.env.TMDB_ACCESS_TOKEN;

if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN não está definida");
}

export const tmdb = createClient<paths>({
    baseUrl: "https://api.themoviedb.org",
    headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
    },
});

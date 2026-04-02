import { MovieDb } from "moviedb-promise";
import axios, { AxiosRequestConfig } from "axios";
import { NextResponse } from "next/server";

export function getApi() {
    return new MovieDb(process.env.TMDB_API_KEY as string);
}

export function getError(error: unknown) {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;

        const message =
            error.response?.data?.status_message ||
            error.message ||
            "Request failed";

        return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
    );
}

export function setHeaders(): AxiosRequestConfig {
    return {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.TMDB_READ_TOKEN as string,
        },
    };
}

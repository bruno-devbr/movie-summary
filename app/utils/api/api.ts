import { MovieDb } from "moviedb-promise";
import { NextResponse } from "next/server";

export const api = new MovieDb(process.env.TMDB_API_KEY as string);

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

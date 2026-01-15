import { getApi, getError } from "@/app/utils/api/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const api = getApi();

        const rawData = await api.genreMovieList({ language: "pt-BR" });
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

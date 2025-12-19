import { api, getError } from "@/app/utils/api/api";
import { GenreProps } from "@/app/utils/types/genre";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { type: string } }
) {
    try {
        const { type } = await params;

        const res = await api.get<GenreProps>(
            `/genre/${type}/list?language=pt-BR`
        );
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

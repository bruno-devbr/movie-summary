import { api, getError } from "@/app/utils/api";
import { Tv } from "@/app/utils/types/series";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { series_id: string };
};

// GET de serie pelo id
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o series_id do params
        const { series_id } = await params;

        // faz o get retornado um Tv
        const res = await api.get<Tv>(`/tv/${series_id}`, {
            params: {
                append_to_response: "credits,reviews,similar,videos",
                language: "pt-BR",
            },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

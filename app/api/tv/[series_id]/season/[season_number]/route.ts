import { api, getError } from "@/app/utils/api/api";
import { SeasonResponse } from "@/app/utils/types/season";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { series_id: string; season_number: number };
};

// GET de temporadas
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o season_number e series_id do params, faz o get retornando SeasonResponse
        const { season_number, series_id } = await params;
        const res = await api.get<SeasonResponse>(
            `/tv/${series_id}/season/${season_number}`,
            {
                params: { language: "pt-BR" },
            }
        );

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

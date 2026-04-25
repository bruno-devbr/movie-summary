import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detalhes de uma temporada
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(); // cria o obj api
        const { tv_id, season_number } = await getParams(context); // pega tv_id e season_number dos params

        // faz o fetch criando o rawData
        const rawData = await api.seasonInfo({
            language: "pt-BR",
            season_number,
            id: tv_id,
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

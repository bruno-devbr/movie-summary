import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET dos detalhes de uma serie
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(); // cria o obj api
        const { tv_id } = await getParams(context); // pega o tv_id dos params

        // faz o fetch criando rawData
        const rawData = await api.tvInfo({
            append_to_response: "credits,videos,reviews,similar",
            language: "pt-BR",
            id: tv_id,
        });

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

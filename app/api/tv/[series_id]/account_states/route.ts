import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna os estados da conta para uma series
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { series_id } = await getParams(context); // pega series_id dos params

        // faz fetch para obter os estados da conta do filme
        const rawData = await api.tvAccountStates({
            id: series_id,
            language: "pt-BR",
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error); // trata erros
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detalhes sobre uma pessoa
export async function GET(req: NextRequest, context: { params: ParamsProps }) {
    try {
        const api = getApi(req); // cria o obj api
        const { person_id } = await getParams(context); // pega person_id dos params

        // faz fetch passando o id
        const rawData = await api.personInfo({
            id: person_id,
            language: "pt-BR",
            append_to_response: "tv_credits",
        });

        // retorna o rawData com status 200
        return NextResponse.json(rawData, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detalhes sobre a pessoa
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(); // cria o obj api
        const { person_id } = await getParams(context); // pega o person_id dos params

        // faz o fetch criando rawData
        const rawData = await api.personInfo({
            id: person_id,
            language: "pt-BR",
            append_to_response: "movie_credits,tv_credits",
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

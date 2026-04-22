import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/api/getParams";
import { ContextProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna detlhes do filme
export async function GET(req: NextRequest, context: ContextProps) {
    try {
        const api = getApi(); // cria o obj api
        const { movie_id } = await getParams(context); // pega o movie_id dos params

        // faz o fetch criando o rawData
        const rawData = await api.movieInfo({
            id: movie_id,
            language: "pt-BR",
            append_to_response: "credits,videos,reviews,similar",
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // tratamento de erros
    }
}

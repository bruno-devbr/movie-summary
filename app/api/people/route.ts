import { getApi, getError } from "@/app/utils/api/api";
import { getSearchParams } from "@/app/utils/api/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna pessoas populares
export async function GET(req: NextRequest) {
    try {
        const api = getApi(); // cria o obj api
        const { page } = getSearchParams(req); // pega o page dos searchParams

        // faz o fetch criando o rawData
        const rawData = await api.personPopular({
            language: "pt-BR",
            page,
        });

        return NextResponse.json(rawData); // retorna rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

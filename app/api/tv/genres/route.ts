import { getApi, getError } from "@/app/utils/api/api";
import { NextResponse } from "next/server";

// GET que retotna os generos
export async function GET() {
    try {
        const api = getApi(); // cria o obj api

        // faz o fetch criando rawData
        const rawData = await api.genreTvList({
            language: "pt-BR",
        });

        return NextResponse.json(rawData); // retorna o rawData com status 200
    } catch (error) {
        return getError(error); // função de tratamento de erros
    }
}

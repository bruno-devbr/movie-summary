import { getApi, getError } from "@/app/utils/api/api";
import { getParams } from "@/app/utils/params";
import { ParamsProps } from "@/app/utils/types/params";
import { NextRequest, NextResponse } from "next/server";

// GET que retorna a lista do usuario
export async function GET(req: NextRequest, context: ParamsProps) {
    try {
        const api = getApi(req); // cria o obj api
        const { list_id } = await getParams(context); // pega o list id da rota

        // fetch na lista do usuario
        const rawData = await api.listInfo({
            id: list_id,
            language: "pt-BR",
        });

        // retorna rawData e status 200
        return NextResponse.json({ rawData }, { status: 200 });
    } catch (error) {
        return getError(error);
    }
}

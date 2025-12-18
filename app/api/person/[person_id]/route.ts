import { api, getError } from "@/app/utils/api/api";
import { Person } from "@/app/utils/types/person";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: { person_id: string };
};

// GET de pessoa por id
export async function GET(request: NextRequest, { params }: ParamsProps) {
    try {
        // pega o id dos parametros
        const { person_id } = await params;

        // faz o get passando os parametros
        const res = await api.get<Person>(`/person/${person_id}`, {
            params: { append_to_response: "credits", language: "pt-BR" },
        });

        // retorna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

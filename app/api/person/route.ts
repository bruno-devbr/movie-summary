import { api, getError } from "@/app/utils/api/api";
import { PeopleResponse } from "@/app/utils/types/person";
import { NextRequest, NextResponse } from "next/server";

// GET de pessoas populares
export async function GET(request: NextRequest) {
    try {
        // pega o searchparams e o page
        const searchParams = await request.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;

        // faz o get retornando um PeopleResponse
        const res = await api.get<PeopleResponse>("/person/popular", {
            params: { page, language: "pt-BR" },
        });

        // returna status 200
        return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
        // função de tratamento de erros
        return getError(error);
    }
}

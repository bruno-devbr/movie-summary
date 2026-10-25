import { NextRequest } from "next/server";
import z from "zod";
import { AppError } from "./errors";

export async function getBody<T extends z.ZodType>(
    req: NextRequest,
    schema: T,
) {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
        throw new AppError(
            "Corpo da requisição invalido",
            "INVALID_REQUEST_BODY",
            400,
        );
    }

    return result.data;
}

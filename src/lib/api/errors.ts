import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Representa um erro conhecido da aplicação, com código e status HTTP.
export class AppError extends Error {
    code: string;
    status: number;

    constructor(message: string, code: string, status: number) {
        super(message);

        this.name = "AppError"; // Identifica este erro como um AppError.
        this.status = status; // Status HTTP que será enviado na resposta.
        this.code = code; // Código interno para identificar o tipo de erro.
    }
}

// Recebe qualquer erro e o converte para um AppError padronizado.
export function getError(error: unknown): AppError {
    // Se já for um erro conhecido da aplicação, não precisa convertê-lo.
    if (error instanceof AppError) {
        return error;
    }

    // Identifica erros de validação gerados pelo Zod.
    if (error instanceof ZodError) {
        return new AppError(
            "Os dados enviados são inválidos.",
            "VALIDATION_ERROR",
            400,
        );
    }

    // Trata erros inesperados sem expor detalhes internos do servidor.
    return new AppError(
        "Ocorreu um erro interno no servidor.",
        "INTERNAL_ERROR",
        500,
    );
}

// Converte o erro padronizado em uma resposta HTTP no formato JSON.
export function handleApiError(error: unknown) {
    const appError = getError(error); // Normaliza o erro para garantir que tenha mensagem, código e status.

    // Envia a resposta ao cliente com o formato e o status apropriados.
    return NextResponse.json(
        {
            error: {
                message: appError.message,
                code: appError.code,
            },
        },
        {
            status: appError.status,
        },
    );
}

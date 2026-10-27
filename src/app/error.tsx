"use client";

import { CircleX } from "lucide-react";

export default function Error() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center gap-3">
            <CircleX className="size-8 text-red-400" />
            <p className="text-xl text-red-400">Algo deu errado!</p>
            <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-red-500 px-4 py-3 text-base transition-colors hover:bg-red-900"
            >
                Tentar Novamente
            </button>
        </div>
    );
}

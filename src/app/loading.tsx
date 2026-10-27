"use client";

import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center">
            <LoaderCircle className="text-blue-500 size-8 animate-spin" />
            <p className="text-xl">Carregando...</p>
        </div>
    );
}

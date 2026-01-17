"use client";

import { TriangleAlert } from "lucide-react";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <TriangleAlert className="w-8 h-8 text-red-400" />
            Algo deu errado
            <button
                onClick={() => window.location.reload()}
                className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
                Tentar Novamente
            </button>
        </div>
    );
}

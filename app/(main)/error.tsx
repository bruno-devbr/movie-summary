"use client";

import { AlertTriangle } from "lucide-react";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-400 mb-2">
                Ocorreu um erro
            </h2>
            <button
                className="mt-2 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow cursor-pointer"
                onClick={() => window.location.reload()}
            >
                Tentar novamente
            </button>
        </div>
    );
}

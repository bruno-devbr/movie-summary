import { MovieBodyRequest } from "@/app/utils/types/movies";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageProps {
    page: number;
    totalPages: number;
    body: MovieBodyRequest; // Adicionado para manter os filtros
    setBody: (newBody: MovieBodyRequest) => void;
}

export function Pages({ page, setBody, totalPages, body }: PageProps) {
    const handlePageChange = (newPage: number) => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        setBody({
            ...body,
            page: newPage,
        });
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="px-4 font-medium text-gray-200">
                Página {page} de {totalPages || 1}
            </span>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= (totalPages || 0)}
                className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}

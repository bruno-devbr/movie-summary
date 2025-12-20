import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PageProps {
    page: number;
    totalPages: number;
    setPage: (newPage: number) => void;
}

export function Pages({ page, setPage, totalPages }: PageProps) {
    const [isOnlyPage, setIsOnlyPage] = useState(false);

    useEffect(() => {
        function verifyPagesQuant() {
            if (totalPages === 1) {
                setIsOnlyPage(true);
            }
        }

        verifyPagesQuant();
    }, [totalPages]);

    const handlePageChange = (newPage: number) => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        setPage(newPage);
    };

    return (
        <>
            {!isOnlyPage && (
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
            )}
        </>
    );
}

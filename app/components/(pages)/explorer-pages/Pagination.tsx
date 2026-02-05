import { useFilters } from "@/app/utils/hooks/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ totalPages }: { totalPages: number }) {
    const { setPage, page } = useFilters();

    const isFirtPage = page === 1;
    const isLastPage = page === totalPages;

    const handleNext = () => {
        if (!isLastPage) {
            setPage(page + 1);
            window.scroll(0, 0);
        }
    };

    const handlePrev = () => {
        if (!isFirtPage) {
            setPage(page - 1);
            window.scroll(0, 0);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4">
            <button
                type="button"
                disabled={isFirtPage}
                onClick={handlePrev}
                className={`bg-gray-800 p-1 ${!isFirtPage && "hover:bg-gray-700"} transition-colors rounded-lg disabled:bg-gray-900`}
            >
                <ChevronLeft />
            </button>

            <span className="">
                {page} de {totalPages}
            </span>

            <button
                type="button"
                disabled={isLastPage}
                onClick={handleNext}
                className={`bg-gray-800 p-1 ${!isLastPage && "hover:bg-gray-700"} transition-colors rounded-lg disabled:bg-gray-900`}
            >
                <ChevronRight />
            </button>
        </div>
    );
}

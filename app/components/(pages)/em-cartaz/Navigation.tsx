import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
    handleNext: () => void;
    handlePrev: () => void;
}

export function Navigation({ handleNext, handlePrev }: NavigationProps) {
    return (
        <>
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
                aria-label="Filme anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
                aria-label="Próximo filme"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </>
    );
}

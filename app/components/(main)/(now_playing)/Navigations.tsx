import { Movie } from "@/app/utils/types/globalItens";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
    index: number;
    setIndex: (newIndex: number) => void;
    movies: Movie[];
    setIsMouseOver: (newValue: boolean) => void;
}

export function Navigation({
    index,
    setIndex,
    movies,
    setIsMouseOver,
}: NavigationProps) {
    function handleClick(i: number, action: "positive" | "negative") {
        if (action === "positive") {
            if (i + 1 === movies.length) {
                setIndex(0);
            } else {
                setIndex((prev) => prev + 1);
            }
        } else if (action === "negative") {
            if (i - 1 === -1) {
                setIndex(movies.length - 1);
            } else {
                setIndex((prev) => prev - 1);
            }
        }
    }

    return (
        <>
            <button
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                onClick={() => handleClick(index, "negative")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black/70 rounded-full transition-colors cursor-pointer"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                onClick={() => handleClick(index, "positive")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black/70 rounded-full transition-colors cursor-pointer"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </>
    );
}

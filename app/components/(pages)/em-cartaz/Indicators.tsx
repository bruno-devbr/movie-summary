import { Movies } from "@/app/utils/types/moviesSchema";

interface IndicatorProps {
    movies: Movies;
    index: number;
    setIndex: (value: number) => void;
}

export function Indicators({ movies, index, setIndex }: IndicatorProps) {
    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 items-center">
            {movies.map((movie, i) => (
                <button
                    onClick={() => setIndex(i)}
                    className="relative group"
                    key={movie.id}
                >
                    <div
                        className={`w-3 h-3 rounded-full transition-all relative z-10 ${
                            index === i
                                ? "bg-blue-500 scale-125"
                                : "bg-white/50 group-hover:bg-white/70"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

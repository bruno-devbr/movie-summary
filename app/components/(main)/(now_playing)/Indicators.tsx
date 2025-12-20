import { Movies } from "@/app/utils/types/globalItens";

export function Indicators({
    movies,
    index,
    setIndex,
    setIsMouseOver,
}: {
    movies: Movies;
    index: number;
    setIndex: (newIndex: number) => void;
    setIsMouseOver: (newValue: boolean) => void;
}) {
    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {movies.movies.map((_, i) => (
                <button
                    key={i}
                    onMouseEnter={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        i === index ? "bg-blue-500 w-8" : "bg-white/50"
                    }`}
                />
            ))}
        </div>
    );
}

import { MoviesList } from "@/app/utils/types/moviesSchema";
import { Background } from "./Background";
import { Navigation } from "./Navigation";
import { useState } from "react";

export function MoviesCarrosel({ movies }: { movies: MoviesList }) {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index === movies.results.length - 1) {
            setIndex(0);
        } else {
            setIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (index === 0) {
            setIndex(movies.results.length - 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="relative h-125 w-full overflow-hidden">
            <Background movie={movies.results[index]} />
            <Navigation handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    );
}

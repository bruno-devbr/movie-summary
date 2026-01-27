import { MoviesList } from "@/app/utils/types/moviesSchema";
import { Background } from "./Background";
import { Navigation } from "./Navigation";
import { useEffect, useState, useCallback } from "react";
import { Timer } from "./Timer";
import { Content } from "./Content";
import { Indicators } from "./Indicators";

export function MoviesCarrosel({ movies }: { movies: MoviesList }) {
    const [isAwaysPaused, setIsAwaysPaused] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(5);

    const handleNext = useCallback(() => {
        setIndex((prev) => (prev === movies.results.length - 1 ? 0 : prev + 1));
    }, [movies.results.length]);

    const handlePrev = () => {
        if (index === 0) {
            setIndex(movies.results.length - 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    function handleMouseEnter() {
        if (!isAwaysPaused) {
            setIsPaused(true);
        }
    }

    function handleMouseLeave() {
        if (!isAwaysPaused) {
            setIsPaused(false);
        }
    }

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    handleNext();
                    return 5;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, handleNext]);

    return (
        <div
            className="relative h-125 w-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Background movie={movies.results[index]} />
            <Navigation handleNext={handleNext} handlePrev={handlePrev} />
            <Content movie={movies.results[index]} />
            <Timer
                count={count}
                isPaused={isPaused}
                setIsAwaysPaused={setIsAwaysPaused}
                IsAwaysPaused={isAwaysPaused}
            />
            <Indicators
                movies={movies.results}
                index={index}
                setIndex={setIndex}
            />
        </div>
    );
}

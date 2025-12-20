import { CarroselImage } from "./CarroselImage";
import { Content } from "./Content";
import { useEffect, useState } from "react";
import { Navigation } from "./Navigations";
import { Indicators } from "./Indicators";
import { Movies } from "@/app/utils/types/globalItens";

export function Carrosel({ movies }: { movies: Movies }) {
    const [index, setIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (!isMouseOver) {
            interval = setInterval(() => {
                setIndex((prev) =>
                    prev === movies.movies.length - 1 ? 0 : prev + 1
                );
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [movies, isMouseOver]);

    return (
        <div
            className="relative h-[500px] w-full overflow-hidden"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <CarroselImage movie={movies.movies[index]} />
            <Content movie={movies.movies[index]} />
            <Navigation
                index={index}
                setIndex={setIndex}
                movies={movies}
                setIsMouseOver={setIsMouseOver}
            />
            <Indicators
                movies={movies}
                setIndex={setIndex}
                index={index}
                setIsMouseOver={setIsMouseOver}
            />
        </div>
    );
}

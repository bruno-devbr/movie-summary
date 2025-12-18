import { Result } from "@/app/utils/types/movies";
import Image from "next/image";
import { useState } from "react";

export function CarroselImage({ movie }: { movie: Result }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="absolute inset-0">
            <Image
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}.jpg`}
                alt="movie poster"
                fill
                onLoadingComplete={() => setLoaded(true)}
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
        </div>
    );
}

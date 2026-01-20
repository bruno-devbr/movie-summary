import { Movie } from "@/app/utils/types/moviesSchema";
import Image from "next/image";

export function Background({ movie }: { movie: Movie }) {
    return (
        <div className="absolute inset-0">
            <Image
                src={movie.backdrop_path}
                alt={movie.title}
                className="w-full h-full object-cover"
                width={50}
                height={50}
                unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
        </div>
    );
}

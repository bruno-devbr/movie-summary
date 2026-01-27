import { Movie } from "@/app/utils/types/moviesSchema";
import { NotFoundImg } from "./notFoundImg";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export function MoviePoster({ movie }: { movie: Movie }) {
    return (
        <Link href={`/movies/${movie.id}`} className="group">
            <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-gray-800">
                {movie.poster_path ? (
                    <Image
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={movie.poster_path}
                        alt={movie.title}
                        width={100}
                        height={100}
                        unoptimized
                    />
                ) : (
                    <NotFoundImg />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
                            <Star className="lucide lucide-star w-4 h-4 fill-current" />
                            {movie.vote_average}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <h3 className="line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {movie.title}
                </h3>
                {movie.release_date && (
                    <p className="text-sm text-gray-400">
                        {movie.release_date}
                    </p>
                )}
            </div>
        </Link>
    );
}

/*
 */

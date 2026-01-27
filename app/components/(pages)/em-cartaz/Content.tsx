import { Movie } from "@/app/utils/types/moviesSchema";
import { Play, Star } from "lucide-react";
import Link from "next/link";

export function Content({ movie }: { movie: Movie }) {
    return (
        <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
                <h2 className="text-5xl mb-4">{movie.title}</h2>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Star className="lucide lucide-star w-5 h-5 fill-current" />
                        <span className="text-xl">{movie.vote_average}</span>
                    </div>

                    <span className="text-gray-400">{movie.release_date}</span>
                </div>

                <p className="text-gray-300 mb-6 line-clamp-3">
                    {movie.overview}
                </p>

                <button
                    type="button"
                    className="bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
                >
                    <Link
                        href={`/filmes/${movie.id}`}
                        className="flex items-center gap-2"
                    >
                        <Play className="w-5 h-5" />
                        Ver Detalhes
                    </Link>
                </button>
            </div>
        </div>
    );
}

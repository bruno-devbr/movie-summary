import { Movie } from "@/app/utils/types/globalItens";
import { Play, Star } from "lucide-react";
import Link from "next/link";

export function Content({ movie }: { movie: Movie }) {
    return (
        <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                    <h2 className="text-5xl mb-4">{movie.title}</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="text-xl">{movie.rate}</span>
                        </div>
                        <span className="text-gray-400">
                            {new Date(movie.year).getFullYear()}
                        </span>
                    </div>
                    <p className="text-gray-300 mb-6 line-clamp-3">
                        {movie.overview}
                    </p>
                    <Link
                        href={`/filmes/${movie.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        <Play className="w-5 h-5" />
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}

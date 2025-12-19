import { Movie } from "@/app/utils/types/globalItens";
import { Star, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MovieCard({ movie }: { movie: Movie }) {
    const hasImage = !!movie.image;

    return (
        <Link href={`/filmes/${movie.id}`} className="group">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                {hasImage ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w780/${movie.image}.jpg`}
                        alt="movie image"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        fill
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span>Sem imagem</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{movie.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <h3 className="line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-sm text-gray-400">{movie.year}</p>
            </div>
        </Link>
    );
}

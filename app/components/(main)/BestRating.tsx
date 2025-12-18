import { MovieCard } from "./(popular)/MovieCard";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { getBestRating } from "@/app/utils/api/getBestRatingMovies";
import Link from "next/link";

export function BestRating() {
    const [data, setData] = useState<Movie[] | null>(null);

    const { setGlobalError, setGlobalLoading } = useGlobalStore();

    useEffect(() => {
        async function fetchData() {
            const dt = await getBestRating({
                setGlobalError,
                setGlobalLoading,
            });

            setData(dt);
        }

        fetchData();
    }, [setGlobalError, setGlobalLoading]);

    if (!data) return;
    return (
        <section>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl">Melhor Avaliados</h2>
                    <Link
                        href="/filmes/mais-avaliados"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        Ver todos <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} type="movie" />
                    ))}
                </div>
            </div>
        </section>
    );
}

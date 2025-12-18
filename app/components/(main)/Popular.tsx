import { getPopular } from "@/app/utils/api/getpopular";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { Movie } from "@/app/utils/types/globalItens";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MovieCard } from "./(popular)/MovieCard";

export function PopularMovies() {
    const [data, setData] = useState<Movie[] | null>(null);

    const { setGlobalError, setGlobalLoading } = useGlobalStore();

    useEffect(() => {
        async function fetchData() {
            const dt = await getPopular({ setGlobalError, setGlobalLoading });

            setData(dt);
        }

        fetchData();
    }, [setGlobalError, setGlobalLoading]);

    return (
        <section className="mb-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl">Filmes Populares</h2>
                    <Link
                        href="/filmes/populares"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        Ver todos <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
}

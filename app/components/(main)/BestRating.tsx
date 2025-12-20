import { useEffect, useState } from "react";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { getBestRating } from "@/app/utils/api/getBestRatingMovies";
import { Movies } from "@/app/utils/types/globalItens";
import { MoviesGrid } from "../(movies)/MoviesGrid";
import { Link_Title } from "./LinkComponent";

export function BestRating() {
    const [data, setData] = useState<Movies | null>(null);

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
                <Link_Title
                    link="/filmes/mais-avaliados"
                    title="Melhor Avaliados"
                />
                <MoviesGrid movies={data.movies} />
            </div>
        </section>
    );
}

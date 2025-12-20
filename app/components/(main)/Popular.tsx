import { getPopular } from "@/app/utils/api/getpopular";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { Movies } from "@/app/utils/types/globalItens";
import { useEffect, useState } from "react";
import { MoviesGrid } from "../(movies)/MoviesGrid";
import { Link_Title } from "./LinkComponent";

export function PopularMovies() {
    const [data, setData] = useState<Movies | undefined>();

    const { setGlobalError, setGlobalLoading } = useGlobalStore();

    useEffect(() => {
        async function fetchData() {
            const dt = await getPopular({ setGlobalError, setGlobalLoading });

            setData(dt);
        }

        fetchData();
    }, [setGlobalError, setGlobalLoading]);

    if (!data) return;
    return (
        <section className="mb-12">
            <div className="container mx-auto px-4">
                <Link_Title link="/filmes/populares" title="Filmes Populares" />
                <MoviesGrid movies={data.movies} />
            </div>
        </section>
    );
}

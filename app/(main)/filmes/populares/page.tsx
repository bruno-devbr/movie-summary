"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import Loading from "../../loading";
import Error from "../../error";
import { useGetData } from "@/app/utils/hooks/useGetData";
import { useFilters } from "@/app/utils/hooks/store";

export default function PopularMoviesPage() {
    const { page } = useFilters();
    const { error, loading } = useGetData("/api/movies/popular", { page });

    return (
        <>
            {loading && <Loading />}

            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Filmes Populares" />
                    {/* teste*/}
                    {/* teste*/}
                </div>
            )}
        </>
    );
}

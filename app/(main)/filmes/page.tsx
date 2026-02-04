"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../loading";
import Error from "../error";
import { Filters } from "@/app/components/(pages)/explorer-pages/filter-form/Filters";
import { useFilters } from "@/app/utils/hooks/store";
import { GlobalGrid } from "@/app/components/(pages)/Grid";

export default function ExplorerMoviesPage() {
    const { params } = useFilters();
    const { loading, error, data } = useGetData("/api/movies", params);

    if (!data) return null;
    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Explorar Filmes" isFilterPage={true} />
                    <Filters />
                    <GlobalGrid movies={data.results} />
                </div>
            )}
        </>
    );
}

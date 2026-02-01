"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../loading";
import Error from "../error";
import { Filters } from "@/app/components/(pages)/explorer-pages/filter-form/Filters";
import { useFilters, useGlobalStates } from "@/app/utils/hooks/store";

export default function ExplorerMoviesPage() {
    const { params } = useFilters();
    const { loading, error } = useGlobalStates();

    useGetData("/api/movies", params);

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Explorar Filmes" isFilterPage={true} />
                    <Filters />
                </div>
            )}
        </>
    );
}

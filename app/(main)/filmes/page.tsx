"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../loading";
import Error from "../error";
import { useFilters } from "@/app/utils/hooks/store";
import { FiltersProps } from "@/app/utils/types/filters";

export default function ExplorerMoviesPage() {
    const { genres, page, sort_by, vote_average, year } = useFilters();

    const params: FiltersProps = {
        genres,
        page,
        sort_by,
        vote_average,
        year,
    };

    const { error, loading } = useGetData("/api/movies", params);

    return (
        <>
            {loading && <Loading />}

            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Explorar Filmes" isFilterPage={true} />
                    {/* teste*/}
                    {/* teste*/}
                </div>
            )}
        </>
    );
}

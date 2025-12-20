"use client";

import { useFilters, useGlobalStore } from "@/app/utils/hooks/store";
import { Movies } from "@/app/utils/types/globalItens";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import Error from "../../error";
import { getPopular } from "@/app/utils/api/getpopular";
import { GlobalPage } from "@/app/components/(movies)/globalPage";

export default function MoviesPage() {
    const { body } = useFilters();
    const { globalError, globalLoading, setGlobalError, setGlobalLoading } =
        useGlobalStore();

    const [data, setData] = useState<Movies | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [genres] = useState<Genre[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            const dt = await getPopular({
                setGlobalError,
                setGlobalLoading,
                page,
            });

            setData(dt);
        }

        fetchData();
    }, [body, setGlobalError, setGlobalLoading, page]);

    const globalPageProps = {
        showFilters,
        isFiltersPage: false,
        data,
        page,
        setPage,
        setShowFilters,
        genres,
        title: "Filmes Populares",
    };

    return (
        <div className="pb-12">
            {globalLoading && <Loading />}
            {globalError && <Error />}
            <GlobalPage {...globalPageProps} />
        </div>
    );
}

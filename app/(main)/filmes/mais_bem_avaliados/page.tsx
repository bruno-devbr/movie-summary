"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import Loading from "../../loading";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Error from "../../error";
import { useFilters, useGlobalStates } from "@/app/utils/hooks/store";

export default function BestRatePage() {
    const { page } = useFilters();
    const { loading, error } = useGlobalStates();

    useGetData("/api/movies/mais_bem_avaliados", { page });

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Filmes Mais Bem Avaliados" />
                </div>
            )}
        </>
    );
}

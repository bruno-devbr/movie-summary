"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../../loading";
import Error from "../../error";
import { useFilters, useGlobalStates } from "@/app/utils/hooks/store";

export default function PopularMoviesPage() {
    const { page } = useFilters();
    const { loading, error } = useGlobalStates();

    useGetData("/api/movies/em_breve", { page });

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Próximas Estreias" />
                    {/* teste*/}
                    {/* teste*/}
                </div>
            )}
        </>
    );
}

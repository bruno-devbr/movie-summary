"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../../loading";
import Error from "../../error";
import { useFilters, useGlobalStates } from "@/app/utils/hooks/store";

export default function EnCartazPage() {
    const { page } = useFilters();
    const { loading, error } = useGlobalStates();

    useGetData("/api/movies/em_cartaz", { page });

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Filmes em Cartaz" />
                    {/* teste*/}
                    {/* teste*/}
                </div>
            )}
        </>
    );
}

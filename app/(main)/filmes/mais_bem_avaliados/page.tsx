"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import Loading from "../../loading";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Error from "../../error";
import { useState } from "react";

export default function BestRatePage() {
    const [page, setPage] = useState(1);

    const { data, error, loading } = useGetData("/api/movies", { page });

    return (
        <>
            {loading && <Loading />}

            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Filmes Mais Bem Avaliados" />
                    {/* teste*/}
                    {/* teste*/}
                </div>
            )}
        </>
    );
}

"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import { useState } from "react";
import Loading from "../../loading";
import Error from "../../error";

export default function EnCartazPage() {
    const [page, setPage] = useState(1);

    const { data, error, loading } = useGetData("/api/movies", { page });

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

"use client";

import { Title } from "@/app/components/(pages)/explorer-pages/TitleComponent";
import { useGetData } from "@/app/utils/hooks/useGetData";
import Loading from "../../loading";
import Error from "../../error";
import { useFilters } from "@/app/utils/hooks/store";
import { GlobalGrid } from "@/app/components/(pages)/Grid";
import { Pagination } from "@/app/components/(pages)/explorer-pages/Pagination";
import { useResetPage } from "@/app/utils/hooks/useResetPage";

export default function PopularMoviesPage() {
    useResetPage();

    const { page } = useFilters();
    const { loading, error, data } = useGetData("/api/movies/em_breve", {
        page,
    });

    if (!data) return null;
    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="container mx-auto px-4 py-12">
                    <Title text="Próximas Estreias" />
                    <GlobalGrid movies={data.results} />
                    <Pagination totalPages={data.total_pages} />
                </div>
            )}
        </>
    );
}

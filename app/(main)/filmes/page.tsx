"use client";

import { useFilters, useGlobalStore } from "@/app/utils/hooks/store";
import { getGeneralMovies } from "@/app/utils/api/getGeneralMovies";
import { GlobalPage } from "@/app/components/(movies)/globalPage";
import { defaultBody } from "@/app/utils/defaultMovieBody";
import { Movies } from "@/app/utils/types/globalItens";
import { getGenres } from "@/app/utils/api/getGenres";
import { Genre } from "@/app/utils/types/genre";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Error from "../error";

export default function MoviesPage() {
    const { body, setBody } = useFilters();
    const { globalError, globalLoading, setGlobalError, setGlobalLoading } =
        useGlobalStore();

    const [data, setData] = useState<Movies | null>(null);
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchInitialData() {
            const genreList = await getGenres({
                setGlobalError,
                setGlobalLoading,
                type: "movie",
            });

            setGenres(genreList);
        }

        fetchInitialData();

        return () => {
            setBody(defaultBody);
        };
    }, [setBody, setGlobalError, setGlobalLoading]);

    useEffect(() => {
        async function fetchData() {
            const dt = await getGeneralMovies({
                setGlobalError,
                setGlobalLoading,
                body,
                page,
            });

            setData(dt);
        }

        fetchData();
    }, [body, setGlobalError, setGlobalLoading, page]);

    const globalPageProps = {
        showFilters,
        isFiltersPage: true,
        data,
        page,
        setPage,
        setShowFilters,
        genres,
        title: "Filmes",
    };

    return (
        <div className="pb-12">
            {globalLoading && <Loading />}
            {globalError && <Error />}
            <GlobalPage {...globalPageProps} />
        </div>
    );
}

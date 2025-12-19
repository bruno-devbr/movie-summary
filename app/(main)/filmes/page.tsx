"use client";

import { MovieCard } from "@/app/components/(main)/(popular)/MovieCard";
import { useFilters, useGlobalStore } from "@/app/utils/hooks/store";
import { getGeneralMovies } from "@/app/utils/api/getGeneralMovies";
import { FilterPanel } from "@/app/components/(movies)/FilterPanel";
import { defaultBody } from "@/app/utils/defaultMovieBody";
import { Pages } from "@/app/components/(movies)/Pages";
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

    useEffect(() => {
        // Busca os gêneros apenas uma vez ao carregar a página
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
            });

            setData(dt);
        }

        fetchData();
    }, [body, setGlobalError, setGlobalLoading]); // Remova page daqui

    return (
        <div className="pb-12">
            {globalLoading && <Loading />}
            {globalError && <Error />}

            <div
                style={{
                    display: globalLoading || globalError ? "none" : "block",
                }}
            >
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl">Filmes</h1>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                        >
                            {showFilters
                                ? "Ocultar Filtros"
                                : "Mostrar Filtros"}
                        </button>
                    </div>
                    {showFilters && (
                        <FilterPanel
                            genres={genres}
                            setShowFilters={setShowFilters}
                        />
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                        {data?.movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {data?.totalPages === 1 ? null : (
                        <Pages
                            page={body.page}
                            body={body} // Passando o objeto body atual
                            setBody={setBody}
                            totalPages={data?.totalPages || 0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

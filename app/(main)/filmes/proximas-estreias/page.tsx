"use client";

import { MovieCard } from "@/app/components/(main)/(popular)/MovieCard";
import { useFilters, useGlobalStore } from "@/app/utils/hooks/store";
import { Pages } from "@/app/components/(movies)/Pages";
import { Movies } from "@/app/utils/types/globalItens";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import Error from "../../error";
import { getUpcoming } from "@/app/utils/api/getUpcoming";

export default function MoviesPage() {
    const { body, setBody } = useFilters();
    const { globalError, globalLoading, setGlobalError, setGlobalLoading } =
        useGlobalStore();

    const [data, setData] = useState<Movies | null>(null);

    useEffect(() => {
        async function fetchData() {
            const dt = await getUpcoming({
                setGlobalError,
                setGlobalLoading,
                page: body.page,
            });

            setData(dt);
        }

        fetchData();
    }, [body, setGlobalError, setGlobalLoading]);

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
                        <h1 className="text-4xl">Próximas Estreias</h1>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                        {data?.movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {data?.totalPages === 1 ? null : (
                        <Pages
                            page={body.page}
                            body={body}
                            setBody={setBody}
                            totalPages={data?.totalPages || 0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

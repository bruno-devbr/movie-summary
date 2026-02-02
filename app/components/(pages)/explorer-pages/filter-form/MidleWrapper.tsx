import { useFilters, useGlobalStates } from "@/app/utils/hooks/store";
import { GenresList, GenresSchema } from "@/app/utils/types/genres";
import axios from "axios";
import { useEffect, useState } from "react";

export function MiddleWrapper() {
    const [data, setData] = useState<GenresList | null>(null);

    const { setError } = useGlobalStates();
    const { setGenres, genres } = useFilters();

    useEffect(() => {
        if (data) return;

        async function loadData() {
            try {
                const dt = await axios
                    .get("/api/movies/genres")
                    .then((res) => res.data);

                const rawData = GenresSchema.parse(dt);
                setData(rawData.genres);
            } catch {
                setError(true);
            }
        }

        loadData();
    }, [setData, setError, data]);

    const handleClick = (id: number, isIncluding: boolean) => {
        if (isIncluding) {
            setGenres(genres?.filter((g) => g !== id));
        } else {
            setGenres([...genres, id]);
        }
    };

    if (!data) return null;
    return (
        <div className="mt-6">
            <label className="block mb-2 text-sm text-gray-400">Gêneros</label>
            <div className="flex flex-wrap gap-2">
                {data.map((genre) => {
                    const isIncluding = genres?.includes(genre.id);

                    return (
                        <button
                            key={genre.id}
                            type="button"
                            onClick={() => handleClick(genre.id, isIncluding)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors text-gray-300 ${isIncluding ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"} `}
                        >
                            {genre.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

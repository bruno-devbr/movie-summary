import { useGlobalStates } from "@/app/utils/hooks/store";
import { GenresSchema } from "@/app/utils/types/genres";
import axios from "axios";
import { useEffect, useState } from "react";

export function MiddleWrapper() {
    const { setError } = useGlobalStates();
    const [data, setData] = useState<GenresList | null>(null);

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

    return (
        <div className="mt-6">
            <label className="block mb-2 text-sm text-gray-400">Gêneros</label>
            <div className="flex flex-wrap gap-2"></div>
        </div>
    );
}

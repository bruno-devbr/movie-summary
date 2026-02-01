import { useEffect, useState } from "react";
import { MoviesList, MoviesListSchema } from "../types/moviesSchema";
import axios from "axios";
import { FiltersProps } from "../types/filters";

export function useGetData(endpoint: string, params: FiltersProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<null | MoviesList>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const dt = await axios
                    .get(endpoint, { params })
                    .then((res) => res.data);

                const rawData = MoviesListSchema.parse(dt);
                setData(rawData);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { data, loading, error };
}

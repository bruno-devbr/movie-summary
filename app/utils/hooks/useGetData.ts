import axios from "axios";
import { useEffect, useState } from "react";
import { MoviesList, MoviesListSchema } from "../types/moviesSchema";
import { FiltersProps } from "../types/filters";

export function useGetData(endpoint?: string, params?: FiltersProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<MoviesList | null>(null);

    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        if (!endpoint) return;

        const loadData = async () => {
            try {
                setLoading(true);
                setError(false);
                const dt = await axios
                    .get(endpoint, { params })
                    .then((res) => res.data);
                setData(MoviesListSchema.parse(dt));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, paramsKey]);

    return { data, loading, error, setError };
}

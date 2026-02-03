import axios from "axios";
import { useEffect } from "react";
import { MoviesListSchema } from "../types/moviesSchema";
import { FiltersProps } from "../types/filters";
import { useGlobalStates } from "./store";

export function useGetData(endpoint: string, params: FiltersProps) {
    const { setData, setError, setLoading, data } = useGlobalStates();

    useEffect(() => {
        if (data) return;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

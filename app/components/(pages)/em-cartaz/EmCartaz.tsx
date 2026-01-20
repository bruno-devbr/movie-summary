"use client";

import { MoviesList, MoviesListSchema } from "@/app/utils/types/moviesSchema";
import axios from "axios";
import { useEffect, useState } from "react";

export function EmCartaz() {
    const [data, setData] = useState<MoviesList | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const { data } = await axios.get("/api/movies/em_cartaz");
                const rawData = MoviesListSchema.parse(data);

                setData(rawData);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return null;
}

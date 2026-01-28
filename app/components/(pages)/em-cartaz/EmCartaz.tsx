import { MoviesList, MoviesListSchema } from "@/app/utils/types/moviesSchema";
import axios from "axios";
import { useEffect, useState } from "react";
import { MoviesCarrosel } from "./MoviesCarrosel";
import { TitleSection } from "../main/TitleSection";

interface EmCartazProps {
    setLoading: (value: boolean) => void;
    setError: (value: boolean) => void;
}

export function EmCartaz({ setError, setLoading }: EmCartazProps) {
    const [data, setData] = useState<MoviesList | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const dt = await axios
                    .get("/api/movies/em_cartaz")
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
    }, [setError, setLoading]);

    if (!data) return null;
    return (
        <div className="mb-12">
            <TitleSection link="/filmes/em_cartaz" text="Em Cartaz" />
            <MoviesCarrosel movies={data} />
        </div>
    );
}

import { CarrosselTypes } from "@/app/utils/types/CarrosselTypes";
import { TitleSection } from "./TitleSection";
import { MoviesList, MoviesListSchema } from "@/app/utils/types/moviesSchema";
import { useEffect, useState } from "react";
import axios from "axios";
import { GlobalGrid } from "./Grid";

interface CarroselProps {
    content: CarrosselTypes;
    setLoading: (value: boolean) => void;
    setError: (value: boolean) => void;
}

export function Carrosel({ content, setLoading, setError }: CarroselProps) {
    const [data, setData] = useState<MoviesList | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const dt = await axios
                    .get(content.apiRoute)
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
    }, [setError, setLoading, content.apiRoute]);

    console.log(data, content.title);

    if (!data) return null;
    return (
        <section className="mb-12">
            <div className="container mx-auto px-4">
                <TitleSection link={content.link} text={content.title} />
                <GlobalGrid movies={data.results} />
            </div>
        </section>
    );
}

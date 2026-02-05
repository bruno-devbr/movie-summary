import { MoviesCarrosel } from "./MoviesCarrosel";
import { TitleSection } from "../main/TitleSection";
import { useGetData } from "@/app/utils/hooks/useGetData";

export function EmCartaz() {
    const { data } = useGetData("/api/movies/em_cartaz", {});

    if (!data) return null;
    return (
        <div className="mb-12">
            <TitleSection link="/filmes/em_cartaz" text="Em Cartaz" />
            <MoviesCarrosel movies={data} />
        </div>
    );
}

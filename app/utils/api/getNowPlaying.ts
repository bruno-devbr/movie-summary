import axios from "axios";
import { DatesMoviesResponse } from "../types/movies";
import { Movie } from "../types/globalItens";
import { fetchFunctioProps } from "../types/fetchFunctionProps";

export async function getNowPlaying({
    setGlobalError,
    setGlobalLoading,
}: fetchFunctioProps): Promise<Movie[]> {
    try {
        setGlobalLoading(true);

        const nowPlaying = await axios
            .get<DatesMoviesResponse>("/api/movies/now_playing")
            .then((res) =>
                res.data.results.slice(0, 9).map<Movie>((movie) => ({
                    image: movie.backdrop_path,
                    title: movie.title,
                    rate: movie.vote_average.toFixed(1),
                    year: new Date(movie.release_date).getFullYear(),
                    overview: movie.overview,
                    id: movie.id,
                }))
            );

        return nowPlaying;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

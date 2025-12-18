import axios from "axios";
import { DatesMoviesResponse } from "../types/movies";
import { Movie } from "../types/globalItens";

interface nowPlayingProps {
    setGlobalError: (newError: boolean) => void;
    setGlobalLoading: (newLoad: boolean) => boolean;
}

export async function getNowPlaying({
    setGlobalError,
    setGlobalLoading,
}: nowPlayingProps): Promise<Movie[]> {
    try {
        setGlobalLoading(true);

        const nowPlaying: Movie = await axios
            .get<DatesMoviesResponse>("/api/movies/now_playing")
            .then((res) =>
                res.data.results.slice(0, 9).map((movie) => ({
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

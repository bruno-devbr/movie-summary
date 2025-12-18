import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie } from "../types/globalItens";

export async function getBestRating({
    setGlobalError,
    setGlobalLoading,
}: fetchFunctioProps): Promise<Movie[]> {
    try {
        setGlobalLoading(true);

        const bestRating = await axios
            .get<MovieResponse>("/api/movies/top_rated")
            .then((res) =>
                res.data.results.map<Movie>((movie) => ({
                    id: movie.id,
                    image: movie.backdrop_path,
                    overview: movie.overview,
                    rate: movie.vote_average.toFixed(1),
                    title: movie.title,
                    year: new Date(movie.release_date).getFullYear(),
                }))
            );

        return bestRating;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

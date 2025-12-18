import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie } from "../types/globalItens";

export async function getPopular({
    setGlobalError,
    setGlobalLoading,
}: fetchFunctioProps): Promise<Movie[]> {
    try {
        setGlobalLoading(true);

        const movies = await axios
            .get<MovieResponse>("/api/movies/popular")
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

        return movies;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

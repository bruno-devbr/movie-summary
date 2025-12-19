import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie } from "../types/globalItens";

export async function getGeneralMovies({
    setGlobalError,
    setGlobalLoading,
    body,
}: fetchFunctioProps): Priomise<Movie[]> {
    try {
        setGlobalLoading(true);

        const generalMovies = await axios
            .post<MovieResponse>("/api/movies", body)
            .then((res) =>
                res.data.results.map((movie) => ({
                    id: movie.id,
                    image: movie.backdrop_path,
                    overview: movie.overview,
                    rate: movie.vote_average.toFixed(1),
                    title: movie.title,
                    year: new Date(movie.release_date).getFullYear(),
                    genres: movie.genre_ids,
                }))
            );

        return generalMovies;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

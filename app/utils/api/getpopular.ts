import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie, Movies } from "../types/globalItens";

export async function getPopular({
    setGlobalError,
    setGlobalLoading,
    page = 1,
}: fetchFunctioProps): Priomise<Movies> {
    try {
        setGlobalLoading(true);

        const generalMovies = await axios
            .get<MovieResponse>(`/api/movies/popular?page=${page}`)
            .then(
                (res) =>
                    <Movies>{
                        movies: res.data.results.map<Movie>((movie) => ({
                            id: movie.id,
                            image: movie.backdrop_path,
                            overview: movie.overview,
                            rate: movie.vote_average.toFixed(1),
                            title: movie.title,
                            year: movie.release_date
                                ? new Date(movie.release_date).getFullYear()
                                : "Sem data",
                        })),

                        totalPages: res.data.total_pages,
                    }
            );

        return generalMovies;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

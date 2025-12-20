import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie } from "../types/globalItens";

export async function getBestRating({
    setGlobalError,
    setGlobalLoading,
    page,
}: fetchFunctioProps): Promise<Movie[]> {
    try {
        setGlobalLoading(true);

        const bestRating = await axios
            .get<MovieResponse>(`/api/movies/top_rated?page=${page}`)
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

        return bestRating;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

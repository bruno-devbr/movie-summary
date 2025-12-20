import axios from "axios";
import { DatesMoviesResponse } from "../types/movies";
import { Movie, Movies } from "../types/globalItens";
import { fetchFunctioProps } from "../types/fetchFunctionProps";

export async function getUpcoming({
    setGlobalError,
    setGlobalLoading,
    page,
}: fetchFunctioProps): Promise<Movies> {
    try {
        setGlobalLoading(true);

        const upComing = await axios
            .get<DatesMoviesResponse>(`/api/movies/upcoming?page=${page}`)
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

        return upComing;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

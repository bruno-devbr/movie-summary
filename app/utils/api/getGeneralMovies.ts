import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { MovieResponse } from "../types/movies";
import { Movie, Movies } from "../types/globalItens";

export async function getGeneralMovies({
    setGlobalError,
    setGlobalLoading,
    body,
    page,
}: fetchFunctioProps): Priomise<Movies> {
    try {
        setGlobalLoading(true);

        const generalMovies = await axios
            .post<MovieResponse>("/api/movies", { ...body, page: page })
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
                        page: res.data.page,
                    }
            );

        return generalMovies;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

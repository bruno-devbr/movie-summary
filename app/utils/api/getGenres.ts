import axios from "axios";
import { fetchFunctioProps } from "../types/fetchFunctionProps";
import { Genre, GenreProps } from "../types/genre";

interface getGenreProps extends fetchFunctioProps {
    type: "tv" | "movie";
}

export async function getGenres({
    setGlobalError,
    setGlobalLoading,
    type,
}: getGenreProps): Promise<Genre[]> {
    try {
        setGlobalLoading(true);

        const genres = await axios
            .get<GenreProps>(`/api/genre/${type}`)
            .then((res) => res.data.genres);

        return genres;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

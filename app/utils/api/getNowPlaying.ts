import axios from "axios";
import { DatesMoviesResponse } from "../types/movies";

interface nowPlayingProps {
    setGlobalError: (newError: boolean) => void;
    setGlobalLoading: (newLoad: boolean) => boolean;
}

export async function getNowPlaying({
    setGlobalError,
    setGlobalLoading,
}: nowPlayingProps) {
    try {
        setGlobalLoading(true);

        const nowPlaying = await axios
            .get<DatesMoviesResponse>("/api/movies/now_playing")
            .then((res) => res.data.results.slice(0, 9));

        return nowPlaying;
    } catch {
        setGlobalError(true);
    } finally {
        setGlobalLoading(false);
    }
}

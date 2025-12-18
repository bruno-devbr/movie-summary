"use client";

import { NowPlaying } from "../components/(main)/NowPlaying";
import { PopularMovies } from "../components/(main)/Popular";
import { useGlobalStore } from "../utils/hooks/store";
import { useToast } from "../utils/hooks/useToast";
import Error from "./error";
import Loading from "./loading";

export default function Home() {
    const { globalError, globalLoading } = useGlobalStore();

    useToast();

    return (
        <div className="pb-12">
            {globalLoading && <Loading />}
            {globalError && <Error />}

            <NowPlaying />
            <PopularMovies />
        </div>
    );
}

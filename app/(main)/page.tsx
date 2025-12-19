"use client";

import { BestRating } from "../components/(main)/BestRating";
import { NowPlaying } from "../components/(main)/NowPlaying";
import { PopularMovies } from "../components/(main)/Popular";
import { useGlobalStore } from "../utils/hooks/store";
import Error from "./error";
import Loading from "./loading";

export default function Home() {
    const { globalError, globalLoading } = useGlobalStore();

    return (
        <div className="pb-12">
            {globalLoading && <Loading />}
            {globalError && <Error />}

            <div
                style={{
                    display: globalLoading || globalError ? "none" : "block",
                }}
            >
                <NowPlaying />
                <PopularMovies />
                <BestRating />
            </div>
        </div>
    );
}

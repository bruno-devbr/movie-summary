"use client";

import { NowPlaying } from "../components/(main)/NowPlaying";
import { useGlobalStore } from "../utils/hooks/store";
import { useToast } from "../utils/hooks/useToast";
import Error from "./error";
import Loading from "./loading";

export default function Home() {
    const { globalError, globalLoading } = useGlobalStore();

    useToast();

    return (
        <div className="pb-12">
            {/* O componente continua montado, mas você mostra o loading por cima ou em outro lugar */}
            {globalLoading && <Loading />}
            {globalError && <Error />}

            <NowPlaying />
        </div>
    );
}

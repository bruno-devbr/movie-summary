"use client";

import { EmCartaz } from "../components/(pages)/em-cartaz/EmCartaz";
import Loading from "./loading";
import Error from "./error";
import { mainCarrossels } from "../utils/pages/MainCarrossels";
import { Carrosel } from "../components/(pages)/main/GlobalCarrossel";
import { useGetData } from "../utils/hooks/useGetData";

export default function Home() {
    const { loading, error } = useGetData();

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!error && !loading && (
                <div className="pb-12">
                    <EmCartaz />
                    {mainCarrossels.map((content) => (
                        <Carrosel key={content.link} content={content} />
                    ))}
                </div>
            )}
        </>
    );
}

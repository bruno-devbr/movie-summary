"use client";

import { useState } from "react";
import { EmCartaz } from "../components/(pages)/em-cartaz/EmCartaz";
import Loading from "./loading";
import Error from "./error";
import { mainCarrossels } from "../utils/pages/MainCarrossels";
import { Carrosel } from "../components/(pages)/GlobalCarrossel";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {loading && <Loading />}

            {error && <Error />}

            {!error && !loading && (
                <div className="pb-12">
                    <EmCartaz setError={setError} setLoading={setLoading} />
                    {mainCarrossels.map((content) => (
                        <Carrosel
                            key={content.link}
                            content={content}
                            setError={setError}
                            setLoading={setLoading}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

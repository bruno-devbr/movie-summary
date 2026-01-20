"use client";

import { useState } from "react";
import { EmCartaz } from "../components/(pages)/em-cartaz/EmCartaz";
import Loading from "./loading";
import Error from "./error";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {loading && <Loading />}

            {error ? (
                <Error />
            ) : (
                <div className="pb-12">
                    <div className={loading ? "hidden" : "block"}>
                        <EmCartaz setError={setError} setLoading={setLoading} />
                    </div>
                </div>
            )}
        </>
    );
}

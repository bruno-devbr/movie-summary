"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RawDataSchema } from "../utils/types/rawData";

export default function ApprovedPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function run() {
            const urlParams = new URLSearchParams(window.location.search);
            const requestToken = urlParams.get("request_token");
            const approved = urlParams.get("approved") === "true";

            if (!requestToken) {
                router.replace("/");
                return;
            }

            let message = {
                type: "TMDB_AUTH_ERROR",
                status: "failed",
            };

            try {
                if (approved) {
                    setLoading(true);

                    const { data } = await axios.post("/api/authentication", {
                        request_token: requestToken,
                    });

                    const rawData = RawDataSchema.parse(data);

                    if (rawData?.ok) {
                        message = {
                            type: "TMDB_AUTH_SUCCESS",
                            status: "ok",
                        };
                    }
                }
            } catch {
                // mantém erro padrão
            } finally {
                setLoading(false);

                if (window.opener) {
                    window.opener.postMessage(message, window.location.origin);
                    window.close();
                }
            }
        }

        run();
    }, [router]);

    return loading ? <Loading /> : null;
}

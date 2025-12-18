"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function ApprovedPage() {
    const searchParams = useSearchParams();

    useEffect(() => {
        // acesso direto
        if (!window.opener) {
            window.location.href = "/";
            return;
        }

        const request_token = searchParams.get("request_token");
        const approved = searchParams.get("approved");

        async function run() {
            try {
                if (approved === "true" && request_token) {
                    await axios.post("/api/authentication", {
                        request_token,
                    });

                    window.opener.postMessage(
                        "tmdb_success",
                        window.location.origin
                    );
                } else {
                    throw new Error();
                }
            } catch {
                window.opener.postMessage("tmdb_error", window.location.origin);
            } finally {
                window.close();
            }
        }

        run();
    }, [searchParams]);

    return null;
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalStore } from "../utils/hooks/store";
import { useEffect, useState } from "react";
import Loading from "../loading";
import axios from "axios";

export default function ApprovedPage() {
    const [loading, setLoading] = useState(true);
    const { setToast } = useGlobalStore();

    const router = useRouter();
    const searchParams = useSearchParams();

    const request_token = searchParams.get("request_token");
    const approved = searchParams.get("approved");

    useEffect(() => {
        async function handleAuth() {
            if (approved === "true" && request_token) {
                try {
                    const res = await axios.post("/api/authentication", {
                        request_token,
                    });

                    if (res.status !== 200) {
                        window.opener.postMessage(
                            "tmdb_error",
                            window.location.origin
                        );
                    } else {
                        window.opener.postMessage(
                            "tmdb_success",
                            window.location.origin
                        );
                    }
                } catch {
                    window.opener.postMessage(
                        "tmdb_error",
                        window.location.origin
                    );
                }
            } else {
                window.opener.postMessage("tmdb_error", window.location.origin);
            }

            setLoading(false);
            window.close();
        }

        handleAuth();
    }, [approved, router, setToast, request_token]);

    return <>{loading && <Loading />}</>;
}

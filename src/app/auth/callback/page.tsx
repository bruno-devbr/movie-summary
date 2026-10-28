"use client";

import Error from "@/app/error";
import Loading from "@/app/loading";
import { useStatus } from "@/store/status";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type SessionRequest = {
    requestToken: string;
    promise: Promise<unknown>;
};

export default function Page() {
    const { isError, isLoading, updateIsError, updateIsLoading } = useStatus();

    const searchParams = useSearchParams();
    const router = useRouter();

    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved") === "true";

    const sessionRequestRef = useRef<SessionRequest | null>(null);

    useEffect(() => {
        if (!requestToken || !approved) {
            router.replace("/");
            return;
        }

        let isActive = true;

        if (
            !sessionRequestRef.current ||
            sessionRequestRef.current.requestToken !== requestToken
        ) {
            sessionRequestRef.current = {
                requestToken,
                promise: axios.post("/api/auth", {
                    request_token: requestToken,
                }),
            };
        }

        const sessionRequest = sessionRequestRef.current.promise;

        sessionRequest
            .then(() => {
                if (isActive) {
                    router.replace("/");
                }
            })
            .catch(() => {
                if (isActive) {
                    updateIsError(true);
                }
            })
            .finally(() => {
                if (isActive) {
                    updateIsLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [approved, requestToken, router, updateIsError, updateIsLoading]);

    if (isError) {
        return <Error />;
    }

    if (isLoading) {
        return <Loading />;
    }

    return null;
}

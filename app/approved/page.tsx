"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalStore } from "../utils/hooks/store";
import { useEffect, useState } from "react";
import Loading from "../loading";
import axios from "axios";

export default function ApprovedPage() {
    const { setToast } = useGlobalStore();
    const [loading, setLoading] = useState(true);

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
                        setToast({
                            msg: "nao foi possivel fazer o login",
                            type: "error",
                        });
                    } else {
                        setToast({
                            msg: "logado com sucesso",
                            type: "success",
                        });
                    }
                } catch (error) {
                    setToast({
                        msg: "nao foi possivel fazer o login",
                        type: "error",
                    });
                }
            } else {
                setToast({
                    msg: "nao foi possivel fazer o login",
                    type: "error",
                });
            }

            setLoading(false);
            router.push("/");
        }

        handleAuth();
    }, [approved, router, setToast, request_token]);

    return <>{loading && <Loading />}</>;
}

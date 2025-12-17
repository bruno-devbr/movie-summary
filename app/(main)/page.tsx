"use client";
import { useEffect } from "react";
import { useGlobalStore } from "../utils/hooks/store";
import { useToast } from "../utils/hooks/useToast";

export default function Home() {
    const { setToast } = useGlobalStore();
    useToast();

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.data === "tmdb_success") {
                setToast({ msg: "Logado com sucesso", type: "success" });
            } else if (event.data === "tmdb_error") {
                setToast({
                    msg: "Não foi possível fazer o login",
                    type: "error",
                });
            }
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [setToast]);

    return null; // futuro jsx;
}

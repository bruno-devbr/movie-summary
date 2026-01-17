import { useEffect, useRef, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { RequestTokenSchema } from "@/app/utils/types/requestToken";
import { showToast } from "@/app/utils/toast";

import {
    ConnectBtn,
    ConnectBtnError,
    ConnectBtnErrorHover,
    ConnectBtnLoad,
} from "./ConnectBtn";

import { UserMenuDesktop } from "./(desktop)/UserMenuDesktop";
import { UserMenuMobile } from "./(mobile)/UserMenuMobile";
import { useUser } from "@/app/utils/hooks/store";

export function UserArea() {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUser();

    const authSuccessRef = useRef(false);

    useEffect(() => {
        function verifyIsLoggedIn() {
            const sessionID = Cookies.get("session_id");
            if (sessionID) setIsLoggedIn(true);
        }

        verifyIsLoggedIn();
    }, [setIsLoggedIn]);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get("/api/authentication");

            const rawData = RequestTokenSchema.parse(data);
            const redirectUrl = `${process.env.NEXT_PUBLIC_APLICATION_URL}/approved`;

            const requestPage = window.open(
                `https://www.themoviedb.org/authenticate/${rawData.request_token}?redirect_to=${redirectUrl}`,
                "the movie db",
                "width=650,height=600,top=100,left=100",
            );

            const handleMessage = (event) => {
                if (event.origin !== window.location.origin) return;

                if (event.data.type === "TMDB_AUTH_SUCCESS") {
                    authSuccessRef.current = true;
                    setIsLoggedIn(true);
                    showToast("Conectado com Sucesso", "success");
                }

                window.removeEventListener("message", handleMessage);
            };

            window.addEventListener("message", handleMessage);

            const timer = setInterval(() => {
                if (requestPage?.closed) {
                    clearInterval(timer);
                    setLoading(false);

                    if (!authSuccessRef.current) {
                        showToast("Não foi possível se conectar", "error");
                    }
                }
            }, 1000);
        } catch {
            showToast("Não foi possível se conectar", "error");
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <UserMenuDesktop />
                    <UserMenuMobile />
                </>
            ) : (
                <>
                    {loading ? (
                        <ConnectBtnLoad />
                    ) : (
                        <ConnectBtn handleLogin={handleLogin} />
                    )}
                </>
            )}
        </>
    );
}

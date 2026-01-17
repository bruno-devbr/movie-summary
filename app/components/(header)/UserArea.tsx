import { UserMenuMobile } from "./(mobile)/UserMenuMobile";
import { UserMenuDesktop } from "./(desktop)/UserMenuDesktop";
import { useState } from "react";
import {
    ConnectBtn,
    ConnectBtnError,
    ConnectBtnErrorHover,
    ConnectBtnLoad,
} from "./ConnectBtn";
import axios from "axios";
import { RequestTokenSchema } from "@/app/utils/types/requestToken";

export function UserArea() {
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        try {
            setLoad(true);

            const rawData = await axios
                .get("/api/authentication")
                .then((res) => RequestTokenSchema.parse(res.data));

            const redirectUrl = `${process.env.NEXT_PUBLIC_APLICATION_URL}/approved`;

            const requestPage = window.open(
                `https://www.themoviedb.org/authenticate/${rawData.request_token}?redirect_to=${redirectUrl}`,
                "the movie db",
                "width=650,height=600,top=100,left=100",
            );

            const handleMessage = (event) => {
                if (event.origin !== window.location.origin) return;

                console.log(event.data.type);
                window.removeEventListener("message", handleMessage);
            };

            window.addEventListener("message", handleMessage);

            const timer = setInterval(() => {
                if (requestPage?.closed) {
                    clearInterval(timer);
                    setLoad(false);
                }
            }, 1000);
        } catch {
            setError(true);
        }
    };

    return (
        <>
            {load ? (
                <ConnectBtnLoad />
            ) : (
                <ConnectBtn handleLogin={handleLogin} />
            )}
        </>
    );
}

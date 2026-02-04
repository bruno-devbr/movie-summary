import axios from "axios";
import { RawDataSchema } from "../types/rawData";
import { User, UserSchema } from "../types/User";
import { showToast } from "../toast";
import { RequestTokenSchema } from "../types/requestToken";
import { getRequestPage } from "./requestPage";
import { cleanUp } from "./cleanUp";
import { messageHandler } from "./handleMessage";

interface LoginProps {
    setUser: (user: User | null) => void;
    setIsLoggedIn: (value: boolean) => void;
    setLoading?: (value: boolean) => void;
    setError: (value: boolean) => void;
    authSuccessRef: RefObject<boolean>;
}

export async function handleLogout({ setUser, setIsLoggedIn }: LoginProps) {
    try {
        const { data } = await axios.delete("/api/authentication");
        const { ok } = RawDataSchema.parse(data);

        if (ok) {
            setUser(null);
            setIsLoggedIn(false);
            showToast("Desconectado com Sucesso", "success");
        }
    } catch {
        showToast("Não Foi Possivel se Desconectar", "error");
    }
}

export async function startTMDBAuth({
    authSuccessRef,
    setLoading,
    setIsLoggedIn,
}: LoginProps) {
    setLoading(true);

    const { data } = await axios.get("/api/authentication");
    const rawData = RequestTokenSchema.parse(data);

    const redirectUrl = `${process.env.NEXT_PUBLIC_APLICATION_URL}/approved`;
    const requestPage = getRequestPage(rawData.request_token, redirectUrl);

    if (!requestPage) {
        setLoading(false);
        return;
    }

    window.addEventListener("message", (event) =>
        messageHandler({
            authSuccessRef,
            event,
            setIsLoggedIn,
            setLoading,
            timer,
        }),
    );

    const timer = setInterval(() => {
        if (requestPage.closed) {
            cleanUp({ setLoading, timer });
        }
    }, 500);
}

export async function loadUserData({
    setUser,
    setError,
    setLoading,
}: LoginProps) {
    try {
        if (setLoading) setLoading(true);

        const { data } = await axios.get("/api/user");
        const rawData = UserSchema.parse(data);

        setUser(rawData);
    } catch {
        setError(true);
    } finally {
        if (setLoading) setLoading(false);
    }
}

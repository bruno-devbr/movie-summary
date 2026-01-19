import axios from "axios";
import { RawDataSchema } from "./types/rawData";
import { User, UserSchema } from "./types/User";
import { showToast } from "./toast";
import { RequestTokenSchema } from "./types/requestToken";

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

    const requestPage = window.open(
        `https://www.themoviedb.org/authenticate/${rawData.request_token}?redirect_to=${redirectUrl}`,
        "the movie db",
        "width=650,height=600,top=100,left=100",
    );

    const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "TMDB_AUTH_SUCCESS") {
            authSuccessRef.current = true;
            setIsLoggedIn(true);
            showToast("Conectado com Sucesso", "success");
        }

        window.removeEventListener("message", messageHandler);
    };

    window.addEventListener("message", messageHandler);

    const timer = setInterval(() => {
        if (requestPage?.closed) {
            clearInterval(timer);
            setLoading(false);

            window.removeEventListener("message", messageHandler);

            if (!authSuccessRef.current) {
                showToast("Não foi possível se conectar", "error");
            }
        }
    }, 1000);
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

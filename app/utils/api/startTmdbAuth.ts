import { Toast } from "../hooks/store";
import axios from "axios";

interface tmdbAuthProps {
    setLoading: (newLoad: boolean) => void;
    setToast: (newToast: Toast) => void;
}

export async function startTmdbAuth({ setLoading, setToast }: tmdbAuthProps) {
    try {
        setLoading(true);

        const res = await axios.get<{ authUrl: string }>("/api/authentication");

        if (!res.data?.authUrl) {
            throw new Error();
        }

        window.location.href = res.data.authUrl;
    } catch {
        setToast({
            type: "error",
            msg: "Não foi possível fazer login",
        });
        setLoading(false);
    }
}

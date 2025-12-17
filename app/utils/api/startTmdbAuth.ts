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

        const authWindow = window.open(
            res.data.authUrl,
            "_blank",
            "width=700,height=700"
        );

        if (!authWindow) throw new Error();

        // checa se a aba foi fechada
        const timer = setInterval(() => {
            if (authWindow.closed) {
                clearInterval(timer);
                setLoading(false);
            }
        }, 500);
    } catch {
        setToast({
            type: "error",
            msg: "Não foi possível fazer login",
        });

        setLoading(false);
    }
}

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

        let timer: NodeJS.Timeout | null = null;

        // Listener para mensagens da janela filha
        function handleMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin) return;

            if (event.data === "tmdb_success") {
                setLoading(false);
                setToast({
                    msg: "Logado com Sucesso",
                    type: "success",
                    id: Date.now(),
                });
            } else if (event.data === "tmdb_error") {
                setLoading(false);
                setToast({
                    type: "error",
                    msg: "Não foi possível fazer login",
                    id: Date.now(),
                });
            }
            if (timer) clearInterval(timer);
            window.removeEventListener("message", handleMessage);
        }

        window.addEventListener("message", handleMessage);

        // checa se a aba foi fechada sem mensagem
        timer = setInterval(() => {
            if (authWindow.closed) {
                clearInterval(timer!);
                window.removeEventListener("message", handleMessage);
                setLoading(false);
                setToast({
                    type: "error",
                    msg: "Login cancelado ou não concluído.",
                    id: Date.now(),
                });
            }
        }, 500);
    } catch {
        setToast({
            type: "error",
            msg: "Não foi possível fazer login",
            id: Date.now(),
        });

        setLoading(false);
    }
}

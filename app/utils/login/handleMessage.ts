import { showToast } from "../toast";
import { cleanUp } from "./cleanUp";

interface MessageProps {
    event: MessageEvent;
    timer: NodeJS.Timeout;
    authSuccessRef: RefObject<boolean>;
    setIsLoggedIn: (value: boolean) => void;
    setLoading: (value: boolean) => void;
}

export function messageHandler(props: MessageProps) {
    if (props.event.origin !== window.location.origin) return;

    if (props.event.data.type === "TMDB_AUTH_SUCCESS") {
        props.authSuccessRef.current = true;
        props.setIsLoggedIn(true);

        showToast("Conectado com Sucesso", "success");
    } else if (event.data.type === "TMDB_AUTH_ERROR") {
        showToast("Não foi possivel se conectar", "error");
    }

    cleanUp({ setLoading: props.setLoading, timer: props.timer });
}

import { messageHandler } from "./handleMessage";

interface CleanUpProps {
    setLoading: (value: boolean) => void;
    timer: NodeJS.Timeout;
}

export function cleanUp({ setLoading, timer }: CleanUpProps) {
    window.removeEventListener("message", messageHandler);
    clearInterval(timer);
    setLoading(false);
}

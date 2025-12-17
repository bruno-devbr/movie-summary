import { toast, Slide } from "react-toastify";
import { useGlobalStore } from "./store";
import { useEffect, useRef } from "react";

export function useToast() {
    const { ts, setToast } = useGlobalStore();
    const hasShown = useRef(false);

    useEffect(() => {
        if (!ts.type || !ts.msg || hasShown.current) return;

        hasShown.current = true; // marca que o toast já foi mostrado

        if (ts.type === "success") {
            toast.success(ts.msg, {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
                transition: Slide,
            });
        }

        if (ts.type === "error") {
            toast.error(ts.msg, {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
                transition: Slide,
            });
        }

        const timer = setTimeout(() => {
            setToast({ msg: "", type: null });
            hasShown.current = false; // reseta para próximos toasts
        }, 5000);

        return () => clearTimeout(timer);
    }, [ts, setToast]);
}

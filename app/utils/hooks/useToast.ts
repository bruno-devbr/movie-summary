import { toast, Slide } from "react-toastify";
import { useGlobalStore } from "./store";
import { useEffect } from "react";

export function useToast() {
    const { ts, setToast } = useGlobalStore();

    useEffect(() => {
        if (!ts.type || !ts.msg) return;

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
            setToast({ msg: "", type: null, id: null });
        }, 5000);

        return () => clearTimeout(timer);
    }, [ts, setToast]);
}

import { toast, Bounce } from "react-toastify";

export function showToast(msg: string, type: "error" | "success") {
    const config = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    };

    if (type === "error") {
        toast.error(msg, config);
    } else if (type === "success") {
        toast.success(msg, config);
    }
}

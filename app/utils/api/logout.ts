import axios from "axios";
import { Toast } from "../hooks/store";
import { User } from "../types/user";

export async function logout({
    setToast,
    setUser,
}: {
    setToast: (newToast: Toast) => void;
    setUser: (newUser: User | null) => void;
}) {
    try {
        const res = await axios.delete("/api/authentication");

        if (res.status !== 200) {
            throw new Error();
        }

        setToast({
            msg: "deslogado com sucesso",
            type: "success",
            id: Date.now(),
        });
        setUser(null);
    } catch {
        setToast({
            msg: "Não foi possivel faz logout",
            type: "error",
            id: Date.now(),
        });
    }
}

import { useUser } from "@/app/utils/hooks/store";
import { loadUserData } from "@/app/utils/login";
import { Loader, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";

export function ConnectBtn({
    handleLogin,
}: {
    handleLogin: () => Promise<void>;
}) {
    return (
        <button
            type="button"
            onClick={handleLogin}
            className="w-full lg:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap flex gap-2 items-center"
        >
            Conectar com TMDB
        </button>
    );
}

export function ConnectBtnLoad() {
    return (
        <button
            disabled
            className="w-full lg:w-auto px-4 py-2 bg-blue-700 rounded-lg flex gap-2 items-center"
        >
            <Loader2 className="w-4 h-4 animate-spin" />
            Carregando...
        </button>
    );
}

export function ConnectBtnError() {
    const [loading, setLoading] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const { setUser } = useUser();

    return (
        <button
            onMouseEnter={() => setIsMouseEnter(true)}
            onMouseLeave={() => setIsMouseEnter(false)}
            onClick={() => loadUserData({ setUser, setLoading })}
            className={`w-full lg:w-auto px-4 py-2 ${
                isMouseEnter ? "bg-red-700" : "bg-red-600"
            } rounded-lg flex gap-2 items-center transition-colors`}
        >
            {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
            ) : (
                <TriangleAlert className="w-5 h-5" />
            )}
            {isMouseEnter ? "Tentar novamente" : "Erro ao carregar dados"}
        </button>
    );
}

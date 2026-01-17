import { Loader2, TriangleAlert } from "lucide-react";

export function ConnectBtn() {
    return (
        <button
            type="button"
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
    return (
        <button className="w-full lg:w-auto px-4 py-2 bg-red-600 rounded-lg flex gap-2 items-center transition-colors">
            <TriangleAlert className="w-5 h-5" />
            Erro ao carregar dados
        </button>
    );
}

export function ConnectBtnErrorHover() {
    return (
        <button className="w-full lg:w-auto px-4 py-2 bg-red-700 rounded-lg flex gap-2 items-center transition-colors">
            <TriangleAlert className="w-5 h-5" />
            Tentar Novamente
        </button>
    );
}

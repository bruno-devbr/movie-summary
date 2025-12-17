import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Ghost className="w-12 h-12 text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-200 mb-2">
                Página não encontrada
            </h2>
            <p className="text-gray-400">
                A página que você procura não existe.
            </p>
        </div>
    );
}

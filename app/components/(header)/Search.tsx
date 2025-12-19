import { Search } from "lucide-react";

export function Input() {
    return (
        /* flex-1 faz o container tentar ocupar o espaço disponível */
        <div className="relative mb-4 lg:mb-0 lg:block flex-1 max-w-[500px]">
            <input
                type="text"
                placeholder="Buscar por filmes, séries..."
                /* Aumentei a largura base e adicionei foco mais visível */
                className="w-full   px-4 py-2 pl-10 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
    );
}

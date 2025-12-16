import { Search } from "lucide-react";

export function Input() {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Buscar..."
                className="w-64 px-4 py-2 pl-10 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
    );
}

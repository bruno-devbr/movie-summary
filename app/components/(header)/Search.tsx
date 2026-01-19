import { Search } from "lucide-react";

export function SearchComponent() {
    return (
        <div className="relative mb-4 lg:mb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                className="w-full lg:w-64 border border-gray-700 rounded-lg px-4 py-2 pl-10 bg-gray-800 outline-none focus:border-blue-500 transition-colors"
                placeholder="Buscar..."
            />
        </div>
    );
}

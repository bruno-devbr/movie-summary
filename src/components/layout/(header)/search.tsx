import { SearchIcon } from "lucide-react";

export function Search() {
    return (
        <div className="relative text-white">
            <input
                type="search"
                placeholder="Buscar..."
                className="flex py-2 pl-10 pr-4 items-center gap-2.5 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:border-blue-500 transition-colors w-full"
            />
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        </div>
    );
}

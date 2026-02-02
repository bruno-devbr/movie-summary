import { useFilters } from "@/app/utils/hooks/store";
import { TopWrapper } from "./TopWrapper";
import { MiddleWrapper } from "./MidleWrapper";

export function Filters() {
    const { isOpen } = useFilters();

    return (
        <form
            className={`bg-gray-800 rounded-lg p-6 mb-8 transition-all duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <h3 className="text-xl mb-4">Filtros</h3>
            <TopWrapper />
            <MiddleWrapper />
        </form>
    );
}

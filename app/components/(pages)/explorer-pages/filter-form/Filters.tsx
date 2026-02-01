import { useFilters } from "@/app/utils/hooks/store";
import { TopWrapper } from "./TopWrapper";

export function Filters() {
    const { isOpen } = useFilters();

    return (
        <>
            {isOpen && (
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <h3 className="text-xl mb-4">Filtros</h3>
                    <TopWrapper />
                </div>
            )}
        </>
    );
}

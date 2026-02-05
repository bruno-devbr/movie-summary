import { useFilters } from "@/app/utils/hooks/store";

export function FilterBtn() {
    const { isOpen, setIsOpen } = useFilters();

    return (
        <button
            className="bg-gray-700 px-4 py-2 rounded-lg transition-colors hover:bg-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
        >
            {isOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
    );
}

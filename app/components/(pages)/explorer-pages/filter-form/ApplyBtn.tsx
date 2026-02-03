import { useFilters } from "@/app/utils/hooks/store";
import { FiltersProps } from "@/app/utils/types/filters";

export function ApplyBtn() {
    const { setParams, genres, vote_average, year, sort_by, setIsOpen } =
        useFilters();

    const params: FiltersProps = {
        genres,
        sort_by,
        vote_average,
        year,
    };

    const handleClick = (e: FormEvent) => {
        e.preventDefault();
        setParams(params);
        setIsOpen(false);
    };

    return (
        <button
            type="submit"
            onClick={handleClick}
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
            Aplicar Filtros
        </button>
    );
}

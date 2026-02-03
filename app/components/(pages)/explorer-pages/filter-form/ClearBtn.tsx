import { useFilters } from "@/app/utils/hooks/store";
import { FiltersProps, SORT_BY } from "@/app/utils/types/filters";

export function ClearBtn() {
    const filters = useFilters();

    const params: FiltersProps = {
        genres: filters.genres,
        sort_by: filters.sort_by,
        vote_average: filters.vote_average,
        year: filters.year,
    };

    const handleClick = (e: FormEvent) => {
        e.preventDefault();

        filters.setGenres([]);
        filters.setSort(SORT_BY.POPULARITY_DESC);
        filters.setVote(0);
        filters.setYear(null);
        filters.setParams(params);
        filters.setIsOpen(false);
    };

    return (
        <button
            type="reset"
            onClick={handleClick}
            className="bg-gray-700 py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
            Limpar
        </button>
    );
}

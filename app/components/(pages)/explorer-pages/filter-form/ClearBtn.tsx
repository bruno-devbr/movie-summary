import { useFilters } from "@/app/utils/hooks/store";
import { FiltersProps, SORT_BY } from "@/app/utils/types/filters";

export function ClearBtn() {
    const filters = useFilters();

    const params: FiltersProps = {
        genres: [],
        sort_by: SORT_BY.POPULARITY_DESC,
        vote_average: 0,
        year: null,
    };

    const handleClick = (e: FormEvent) => {
        e.preventDefault();

        filters.setGenres(params.genres);
        filters.setSort(params.sort_by);
        filters.setVote(params.vote_average);
        filters.setYear(params.year);

        filters.setParams(params);
        filters.setIsOpen(false);
    };

    return (
        <button
            type="submit"
            onClick={handleClick}
            className="bg-gray-700 py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
            Limpar
        </button>
    );
}

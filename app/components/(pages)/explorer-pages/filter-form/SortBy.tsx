import { useFilters } from "@/app/utils/hooks/store";
import { sortBy_contents } from "@/app/utils/pages/sortBy_contents";

export function SortBy() {
    const { setSort, sort_by } = useFilters();

    return (
        <div>
            <label
                htmlFor="sort_by"
                className="block mb-2 text-sm text-gray-400"
            >
                Ordenar Por
            </label>

            <select
                name="sort_by"
                value={sort_by}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
            >
                {sortBy_contents.map((content) => (
                    <option value={content.value} key={content.value}>
                        {content.text}
                    </option>
                ))}
            </select>
        </div>
    );
}

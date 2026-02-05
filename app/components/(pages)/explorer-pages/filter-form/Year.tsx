import { useFilters } from "@/app/utils/hooks/store";

export function Year() {
    const { year, setYear } = useFilters();

    return (
        <div>
            <label htmlFor="year" className="block mb-2 text-sm text-gray-400">
                Ano
            </label>

            <input
                type="number"
                className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                value={year ?? ""}
                min={0}
                max={new Date().getFullYear()}
                step={1}
                placeholder="Ex: 2025"
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                onChange={(e) => {
                    const v = e.target.value;
                    setYear(v === "" ? null : Number(v));
                }}
            />
        </div>
    );
}

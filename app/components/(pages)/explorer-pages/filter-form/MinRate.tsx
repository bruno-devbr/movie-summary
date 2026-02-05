import { useFilters } from "@/app/utils/hooks/store";

export function MinRate() {
    const { vote_average, setVote } = useFilters();

    return (
        <div>
            <label
                htmlFor="min-rate"
                className="block mb-2 text-sm text-gray-400"
            >
                Avaliação Minima {vote_average}
            </label>

            <input
                type="range"
                value={vote_average}
                min={0}
                max={10}
                step={0.1}
                className="w-full"
                onChange={(e) => setVote(Number(e.target.value))}
            />
        </div>
    );
}

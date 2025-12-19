import { defaultBody } from "@/app/utils/defaultMovieBody";
import { useFilters } from "@/app/utils/hooks/store";
import { Genre } from "@/app/utils/types/genre";
import { sort_by } from "@/app/utils/types/movies";
import { useState } from "react";

interface FilterProps {
    genres: Genre[];
    setShowFilters: (newValue: boolean) => void;
}

export function FilterPanel({ genres, setShowFilters }: FilterProps) {
    const { setBody, body } = useFilters();

    const [minRate, setMinRate] = useState(body["vote_average.gte"] || 0);
    const [year, setYear] = useState<number>(body.primary_release_year || 2025);

    const [sortOpt, setSortOpt] = useState<sort_by>(
        body.sort_by || sort_by.PopularityDesc
    );

    const [genreList, setGenreList] = useState<number[]>(
        body.with_genres || []
    );

    const options = [
        {
            text: "Popularidade (Decrescente)",
            value: sort_by.PopularityDesc,
        },
        {
            text: "Popularidade (Crescente)",
            value: sort_by.PopularityAsc,
        },
        {
            text: "Avaliação (Decrescente)",
            value: sort_by.VoteAverageDesc,
        },
        {
            text: "Avaliação (Crescente)",
            value: sort_by.VoteAverageAsc,
        },
        {
            text: "Data de Lançamento (Recente)",
            value: sort_by.PrimaryReleaseDateDesc,
        },
        {
            text: "Data de Lançamento (Antiga)",
            value: sort_by.PrimaryReleaseDateAsc,
        },
    ];

    const handleClear = () => {
        setGenreList([]);
        setMinRate(0);
        setYear(2025);
        setSortOpt(sort_by.PopularityDesc);
        setBody(defaultBody);
        setShowFilters(false);
    };

    const handleApplyFilters = () => {
        setBody({
            "vote_average.gte": minRate,
            language: "pt-Br",
            page: 1,
            primary_release_year: year,
            region: "BR",
            sort_by: sortOpt,
            with_genres: genreList,
        });

        setShowFilters(false);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl mb-4">Filtros</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <label className="block mb-2 text-sm text-gray-400">
                        Ordenar Por
                    </label>
                    <select
                        value={sortOpt}
                        onChange={(e) => setSortOpt(e.target.value as sort_by)}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                        {options.map((opt, i) => (
                            <option key={i} value={opt.value}>
                                {opt.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">
                        Avaliação Mínima: {minRate}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        className="w-full"
                        value={minRate}
                        onChange={(e) => setMinRate(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">
                        Ano
                    </label>
                    <input
                        type="number"
                        placeholder="Ex: 2025"
                        min={0}
                        max={new Date().getFullYear()}
                        value={!year ? "" : year}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                        onInput={(e) => {
                            const currentYear = new Date().getFullYear();
                            const value = Number(
                                e.currentTarget.value.replace(/\D/g, "")
                            );
                            setYear(value > currentYear ? currentYear : value);
                        }}
                    />
                </div>
            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm text-gray-400">
                    Gêneros
                </label>
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() =>
                                setGenreList(
                                    genreList.includes(genre.id)
                                        ? genreList.filter(
                                              (g) => g !== genre.id
                                          )
                                        : [...genreList, genre.id]
                                )
                            }
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                genreList.includes(genre.id)
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            } cursor-pointer`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 mt-6">
                <button
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                    onClick={handleApplyFilters}
                >
                    Aplicar Filtros
                </button>
                <button
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                    onClick={handleClear}
                >
                    Limpar
                </button>
            </div>
        </div>
    );
}

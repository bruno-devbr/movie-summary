interface Filter_TitleProps {
    title: string;
    isFiltersPage: boolean;
    showFilters: boolean;
    setShowFilters: (newValue: boolean) => void;
}

export function Title_FilterBtn({
    isFiltersPage,
    setShowFilters,
    showFilters,
    title,
}: Filter_TitleProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl">{title}</h1>

            {isFiltersPage && (
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>
            )}
        </div>
    );
}

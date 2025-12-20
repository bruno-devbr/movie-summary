import { useGlobalStore } from "@/app/utils/hooks/store";
import { FilterPanel } from "./FilterPanel";
import { Pages } from "./Pages";
import { Movies } from "@/app/utils/types/globalItens";
import { Genre } from "@/app/utils/types/genre";
import { Title_FilterBtn } from "./Title&FilterBtn";
import { MoviesGrid } from "./MoviesGrid";

interface globalPageProps {
    showFilters: boolean;
    isFiltersPage: boolean;
    data: Movies;
    page: number;
    setPage: (newPage: number) => void;
    setShowFilters: (newValue: boolean) => void;
    genres: Genre[];
    title: string;
}

export function GlobalPage({
    showFilters,
    isFiltersPage,
    data,
    page,
    setPage,
    setShowFilters,
    genres,
    title,
}: globalPageProps) {
    const { globalLoading, globalError } = useGlobalStore();

    const filter_TitleProps = {
        isFiltersPage,
        setShowFilters,
        showFilters,
        title,
    };

    const filterPanelProps = {
        genres,
        setShowFilters,
        setPage,
        showFilters,
        isFiltersPage,
    };

    const pagesProps = {
        page,
        setPage,
        totalPages: data?.totalPages,
    };

    return (
        <div
            className="container mx-auto px-4 py-12"
            style={{
                display: globalLoading || globalError ? "none" : "block",
            }}
        >
            <Title_FilterBtn {...filter_TitleProps} />
            <FilterPanel {...filterPanelProps} />
            <MoviesGrid movies={data?.movies} />
            <Pages {...pagesProps} />
        </div>
    );
}

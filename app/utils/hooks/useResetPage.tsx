import { useEffect } from "react";
import { useFilters } from "./store";

export const useResetPage = () => {
    const { setPage } = useFilters();

    useEffect(() => {
        setPage(1);
    }, [setPage]);
};

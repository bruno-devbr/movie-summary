import { SORT_BY } from "../types/filters";

interface SortBy_ContentsProps {
    value: SORT_BY;
    text: string;
}

export const sortBy_contents: SortBy_ContentsProps[] = [
    { text: "Popularidade (Decrescente)", value: SORT_BY.POPULARITY_DESC },
    { text: "Popularidade (Crescente)", value: SORT_BY.POPULARITY_ASC },
    { text: "Avaliação (Decrescente)", value: SORT_BY.VOTE_AVERAGE_DESC },
    { text: "Avaliação (Crescente)", value: SORT_BY.VOTE_AVERAGE_ASC },
    {
        text: "Data de Lançamento (Recente)",
        value: SORT_BY.PRIMARY_RELEASE_DATE_DESC,
    },
    {
        text: "Data de Lançamento (Antiga)",
        value: SORT_BY.PRIMARY_RELEASE_DATE_ASC,
    },
];

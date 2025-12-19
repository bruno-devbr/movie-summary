import { MovieBodyRequest, sort_by } from "./types/movies";

export const defaultBody: MovieBodyRequest = {
    "vote_average.gte": 0,
    language: "pt-BR",
    page: 1,
    primary_release_year: 2025,
    region: "BR",
    sort_by: sort_by.PopularityDesc,
    with_genres: [],
};

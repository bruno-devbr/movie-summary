export interface SearchMultiResponse {
    page: number;
    results: Array<MovieResult | TvResult | PersonResult>;
    total_pages: number;
    total_results: number;
}

interface MovieResult {
    media_type: "movie";
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string; // formato YYYY-MM-DD
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TvResult {
    media_type: "tv";
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date: string; // formato YYYY-MM-DD
    vote_average: number;
    vote_count: number;
}

interface PersonResult {
    media_type: "person";
    id: number;
    name: string;
    popularity: number;
    profile_path: string | null;
    known_for: Array<MovieResult | TvResult>; // trabalhos conhecidos
}

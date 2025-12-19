export interface MovieBodyRequest {
    language: "pt-Br";
    page: number;
    primary_release_year: number;
    region: "BR";
    sort_by: sort_by;
    "vote_average.gte": number;
    with_genres: number[];
}

export enum sort_by {
    PopularityAsc = "popularity.asc",
    PopularityDesc = "popularity.desc",
    PrimaryReleaseDateAsc = "primary_release_date.asc",
    PrimaryReleaseDateDesc = "primary_release_date.desc",
    VoteAverageDesc = "vote_average.desc",
    VoteAverageAsc = "vote_average.asc",
}

export interface MovieResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface DatesMoviesResponse {
    dates: Dates;
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: string | null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: Credits;
    reviews: Reviews;
    similar: Similar;
    videos: Videos;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: Department;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    cast_id?: number;
    character?: string;
    credit_id: string;
    order?: number;
    department?: Department;
    job?: string;
}

export enum Department {
    Acting = "Acting",
    Art = "Art",
    Camera = "Camera",
    CostumeMakeUp = "Costume & Make-Up",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Lighting = "Lighting",
    Production = "Production",
    Sound = "Sound",
    VisualEffects = "Visual Effects",
    Writing = "Writing",
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface Reviews {
    page: number;
    results: ReviewsResult[];
    total_pages: number;
    total_results: number;
}

export interface ReviewsResult {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

export interface AuthorDetails {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: number | null;
}

export interface Similar {
    page: number;
    results: SimilarResult[];
    total_pages: number;
    total_results: number;
}

export interface SimilarResult {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Videos {
    results: VideosResult[];
}

export interface VideosResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    published_at: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    id: string;
}

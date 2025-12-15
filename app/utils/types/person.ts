export interface PeopleResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownFor[];
}

export interface KnownFor {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    name?: string;
    original_name?: string;
    overview: string;
    poster_path: string;
    media_type: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
    title?: string;
    original_title?: string;
    release_date?: string;
    video?: boolean;
}

export interface Person {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string | null;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    credits: Credits;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
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
    character?: string;
    credit_id: string;
    order?: number;
    department?: string;
    job?: string;
}

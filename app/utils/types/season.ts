export interface SeasonResponse {
    _id: string;
    air_date: string;
    episodes: Episode[];
    name: string;
    networks: Network[];
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export interface Episode {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: Crew[];
    guest_stars: Crew[];
}

export interface Crew {
    department?: string;
    job?: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string | null;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    character?: string;
    order?: number;
}

export interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

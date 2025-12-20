export interface Movies {
    totalPages: number;
    page: number;
    movies: Movie[];
}

export interface Movie {
    image: string;
    title: string;
    rate: string;
    year: number | "Sem data";
    overview: string;
    id: number;
}

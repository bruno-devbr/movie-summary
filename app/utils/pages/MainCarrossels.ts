import { CarrosselTypes } from "../types/CarrosselTypes";

export const mainCarrossels: CarrosselTypes[] = [
    {
        title: "Filmes Populares",
        link: "/movies/populares",
        apiRoute: "/api/movies/popular",
    },
    {
        title: "Próximas Estreias",
        link: "/movies/em_breve",
        apiRoute: "/api/movies/em_breve",
    },
    {
        title: "Mais Bem Avaliados",
        link: "/movies/mais_bem_avaliados",
        apiRoute: "/api/movies/mais_bem_avaliados",
    },
];

import { CarrosselTypes } from "../types/CarrosselTypes";

export const mainCarrossels: CarrosselTypes[] = [
    {
        title: "Filmes Populares",
        link: "/filmes/populares",
        apiRoute: "/api/movies/popular",
    },
    {
        title: "Próximas Estreias",
        link: "/filmes/em_breve",
        apiRoute: "/api/movies/em_breve",
    },
    {
        title: "Mais Bem Avaliados",
        link: "/filmes/mais_bem_avaliados",
        apiRoute: "/api/movies/mais_bem_avaliados",
    },
];

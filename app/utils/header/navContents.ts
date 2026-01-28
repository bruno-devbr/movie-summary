import { NavProps } from "../types/NavTypes";

export const contents: NavProps[] = [
    {
        btnContent: "Filmes",
        dropDownContent: [
            { content: "Populares", link: "/filmes/populares" },
            { content: "Em Cartaz", link: "/filmes/em_cartaz" },
            { content: "Próximas Estreias", link: "/filmes/em_breve" },
            {
                content: "Mais Bem Avaliados",
                link: "/filmes/mais_bem_avaliados",
            },
            { content: "Explorar", link: "/filmes" },
        ],
    },
    {
        btnContent: "Séries",
        dropDownContent: [
            { content: "Populares", link: "/series/populares" },
            { content: "Em Exibição Hoje", link: "/series/em_exibicao" },
            {
                content: "Mais Bem Avaliados",
                link: "/series/mais_bem_avaliados",
            },
            { content: "Explorar", link: "/series" },
        ],
    },
    {
        btnContent: "Pessoas",
        dropDownContent: [{ content: "Populares", link: "/pessoas" }],
    },
];

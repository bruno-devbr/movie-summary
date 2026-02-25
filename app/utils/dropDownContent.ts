import { DropDownProps } from "./types/dropDown";

export const dropDownContent: DropDownProps[] = [
    {
        content: "Filmes",
        dropDownContent: [
            { content: "Populares", link: "/filmes/populares" },
            { content: "Em Cartaz", link: "/filmes/em_cartaz" },
            { content: "Próximas Estreias", link: "/filmes/proximas_estreias" },
            {
                content: "Mais Bem Avaliados",
                link: "/filmes/mais_bem_avaliados",
            },
            { content: "Explorar", link: "/filmes/explorar" },
        ],
    },
    {
        content: "Séries",
        dropDownContent: [
            { content: "Populares", link: "/series/populares" },
            { content: "Em Exibição Hoje", link: "/series/em_exibicao" },
            {
                content: "Mais Bem Avaliados",
                link: "/series/mais_bem_avaliados",
            },
            { content: "Explorar", link: "/series/explorar" },
        ],
    },
    {
        content: "Pessoas",
        dropDownContent: [{ content: "Populares", link: "/pessoas/populares" }],
    },
];

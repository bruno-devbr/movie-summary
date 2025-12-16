import { Bookmark, Heart, List } from "lucide-react";
import { DropDownProps, SubLink } from "./types/dropDownTypes";

export const navLinks: DropDownProps[] = [
    {
        title: "Filmes",
        arr: [
            { title: "Filmes Gerais", link: "/filmes" },
            { title: "Populares", link: "/filmes/populares" },
            { title: "Em Cartaz", link: "/filmes/em-cartaz" },
            { title: "Próximas Estreias", link: "/filmes/proximas-estreias" },
            { title: "Mais Bem Avaliados", link: "/filmes/mais-avaliados" },
        ],
    },
    {
        title: "Series",
        arr: [
            { title: "Series Gerais", link: "/series" },
            { title: "Populares", link: "/series/populares" },
            { title: "Em Exibição Hoje", link: "/series/em-exibicao" },
            { title: "Mais Bem Avaliados", link: "/series/mais-avaliados" },
        ],
    },
    {
        title: "Pessoas",
        arr: [{ title: "Populares", link: "/pessoas" }],
    },
];

export const userDropDow: SubLink[] = [
    { title: "Minhas Listas", icon: List, link: "/list" },
    { title: "Watchlist", icon: Bookmark, link: "/watchlist" },
    { title: "Favorites", icon: Heart, link: "/favorites" },
];

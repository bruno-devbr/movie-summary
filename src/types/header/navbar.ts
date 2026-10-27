export interface NavInterface {
    navItems: NavItemInterface[];
}

export interface NavItemInterface {
    id: string;
    label: string;
    dropdownItems: DropdownItem[];
}

export interface DropdownItem {
    name: string;
    link: string;
}

export const navItems: NavInterface = {
    navItems: [
        {
            id: "movies",
            label: "Filmes",
            dropdownItems: [
                {
                    name: "Populares",
                    link: "/filmes/populares",
                },
                {
                    name: "Em Cartaz",
                    link: "/filmes/em_cartaz",
                },
                {
                    name: "Próximas Estreias",
                    link: "/filmes/proximas_estreias",
                },
                {
                    name: "Mais Bem Avaliados",
                    link: "/filmes/mais_bem_avaliados",
                },
                {
                    name: "Explorar",
                    link: "/filmes",
                },
            ],
        },
        {
            id: "series",
            label: "Séries",
            dropdownItems: [
                {
                    name: "Populares",
                    link: "/series/populares",
                },
                {
                    name: "Em Exibição Hoje",
                    link: "/series/em_exibicao_hoje",
                },
                {
                    name: "Mais Bem Avaliados",
                    link: "/series/mais_bem_avaliados",
                },
                {
                    name: "Explorar",
                    link: "/series",
                },
            ],
        },
        {
            id: "people",
            label: "Pessoas",
            dropdownItems: [
                {
                    name: "Populares",
                    link: "/pessoas/populares",
                },
            ],
        },
    ],
};

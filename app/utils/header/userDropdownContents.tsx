import { Bookmark, Heart, List } from "lucide-react";
import { UserDropDownProps } from "../types/UserDropdown";

export const userContents: UserDropDownProps[] = [
    { link: "/user/listas", icon: <List />, text: "Minhas Listas" },
    { link: "/user/watchlist", icon: <Bookmark />, text: "WatchList" },
    { link: "/user/favoritos", icon: <Heart />, text: "Favoritos" },
];

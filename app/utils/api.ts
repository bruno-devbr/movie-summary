import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
        "Content-Type": "application/json",
    },
});

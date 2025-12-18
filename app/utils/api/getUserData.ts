import axios from "axios";
import { ListResponse } from "../types/lists";
import { Rating } from "../types/rate";
import { AccountDetails } from "../types/account";
import { User } from "../types/user";

interface fecthUserProps {
    setError: (newErr: boolean) => void;
    setLoading: (newLoad: boolean) => void;
}

export async function getUserData({ setError, setLoading }: fecthUserProps) {
    try {
        setLoading(true);

        const userDetails = await axios
            .get<AccountDetails>("/api/user/details")
            .then((res) => res.data);

        const userFavorites = await axios
            .get<ListResponse>("/api/user/favorites")
            .then((res) => res.data.results.map((fav) => fav.id))
            .catch(() => []);

        const userLists = await axios
            .get<ListResponse>("/api/user/lists")
            .then((res) => res.data.results.map((list) => list.id))
            .catch(() => []);

        const userRating = await axios
            .get<Rating>("/api/user/rating")
            .then((res) => res.data.results.map((item) => item.id));

        const userWatchList = await axios
            .get<ListResponse>("/api/user/watchlist")
            .then((res) => res.data.results.map((item) => item.id))
            .catch(() => []);

        const userAvatar = userDetails?.avatar?.gravatar?.hash ?? null;

        const user: User = {
            avatar: userAvatar,
            id: userDetails.id,
            ratings_itens: userRating,
            username: userDetails.username,
            favorites: userFavorites,
            lists: userLists,
            watchList: userWatchList,
        };

        return user;
    } catch {
        setError(true);
    } finally {
        setLoading(false);
    }
}

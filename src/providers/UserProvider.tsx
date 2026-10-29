"use client";

import { useUserStatus } from "@/store/status";
import { useUserStore } from "@/store/user";
import {
    GetUserDataInterface,
    UserInterface,
    UserListsBase,
} from "@/types/login/user";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUserFunctions } from "@/hooks/useUserData";

export function UserProvider({ children }: { children: ReactNode }) {
    const { updateUser } = useUserStore();
    const { updateIsUserError, updateIsUserLoading } = useUserStatus();
    const pathname = usePathname();
    const functions = useUserFunctions();

    useEffect(() => {
        if (pathname === "/auth/callback") {
            return;
        }

        async function getUser() {
            try {
                updateIsUserLoading(true);

                const { data } =
                    await axios.get<GetUserDataInterface>("/api/user");

                if (!data.username) {
                    throw new Error("Usuário sem username no TMDB");
                }

                const user: UserInterface = {
                    id: data.id,
                    username: data.username,
                    avatar: data.avatar?.tmdb?.avatar_path || undefined,
                    userFunctions: functions,
                    favorites:
                        (await functions.getFavorites()) || UserListsBase,
                    watchlist:
                        (await functions.getWatchlist()) || UserListsBase,
                    lists: (await functions.getLists()) || UserListsBase,
                };

                updateUser(user);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    updateUser(null);
                    updateIsUserError(false);
                    return;
                }

                updateIsUserError(true);
            } finally {
                updateIsUserLoading(false);
            }
        }

        void getUser();
    }, [
        pathname,
        updateIsUserError,
        updateIsUserLoading,
        updateUser,
        functions,
    ]);

    return <>{children}</>;
}

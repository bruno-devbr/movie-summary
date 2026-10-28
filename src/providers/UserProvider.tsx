"use client";

import { useStatus } from "@/store/status";
import { useUserStore } from "@/store/user";
import { GetUserDataInterface, UserInterface } from "@/types/login/user";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export function UserProvider({ children }: { children: ReactNode }) {
    const { updateUser } = useUserStore();
    const { updateIsError, updateIsLoading } = useStatus();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/auth/callback") {
            return;
        }

        async function getUser() {
            try {
                updateIsLoading(true);

                const { data } =
                    await axios.get<GetUserDataInterface>("/api/user");

                if (!data.username) {
                    throw new Error("Usuário sem username no TMDB");
                }

                const user: UserInterface = {
                    id: data.id,
                    username: data.username,
                    avatar: data.avatar?.tmdb?.avatar_path || undefined,
                };

                updateUser(user);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    updateUser(null);
                    return;
                }

                updateIsError(true);
            } finally {
                updateIsLoading(false);
            }
        }

        getUser();
    }, [pathname, updateIsError, updateIsLoading, updateUser]);

    return <>{children}</>;
}

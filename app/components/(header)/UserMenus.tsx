import { useEffect, useState } from "react";
import { UserMenuDesktop } from "./(desktop)/UserMenuDesktop";
import { UserMenuMobile } from "./(mobile)/UserMenuMobile";
import { useUser } from "@/app/utils/hooks/store";
import { ConnectBtnError } from "./ConnectBtn";
import { loadUserData } from "@/app/utils/login";

interface UserMenusProps {
    setIsOpen: (value: boolean) => void;
}

export function UserMenus({ setIsOpen }: UserMenusProps) {
    const [error, setError] = useState(false);
    const { isLoggedIn, setUser } = useUser();

    useEffect(() => {
        if (isLoggedIn) {
            loadUserData({ isLoggedIn, setError, setUser });
        }
    }, [setUser, isLoggedIn]);

    if (!isLoggedIn) return null;

    return (
        <>
            {error ? (
                <ConnectBtnError />
            ) : (
                <>
                    <UserMenuDesktop />
                    <UserMenuMobile setIsMenuOpen={setIsOpen} />
                </>
            )}
        </>
    );
}

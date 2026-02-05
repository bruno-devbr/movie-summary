import { useEffect, useState } from "react";
import { UserMenuDesktop } from "./(desktop)/UserMenuDesktop";
import { UserMenuMobile } from "./(mobile)/UserMenuMobile";
import { useDropDown, useUser } from "@/app/utils/hooks/store";
import { ConnectBtnError } from "./ConnectBtn";
import { loadUserData } from "@/app/utils/login/login";

export function UserMenus() {
    const [error, setError] = useState(false);

    const { setIsMobileMenuOpen } = useDropDown();
    const { isLoggedIn, setUser } = useUser();

    useEffect(() => {
        if (isLoggedIn) {
            loadUserData({ setError, setUser });
        }

        if (error) {
            setIsMobileMenuOpen(true);
        }
    }, [setUser, isLoggedIn, error, setIsMobileMenuOpen]);

    if (!isLoggedIn) return null;

    return (
        <>
            {error ? (
                <ConnectBtnError setError={setError} />
            ) : (
                <>
                    <UserMenuDesktop />
                    <UserMenuMobile />
                </>
            )}
        </>
    );
}

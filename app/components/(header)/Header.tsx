"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { Input } from "./Search";
import { navLinks } from "@/app/utils/dropDowns";
import { ConectBtn, UserDisplay } from "./UserBtns";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { MobileMenu } from "./MobileMenu";
import { MobileMenuDropdown } from "./MobilDropDown";

export function Header() {
    const { setToast } = useGlobalStore();

    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedin, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function verifyLogin() {
            const session_id = document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn="))
                ?.split("=")[1];

            if (session_id === "true") {
                setIsLoggedIn(true);
            }
        }

        verifyLogin();

        function handleMessage(event: MessageEvent) {
            if (event.data === "tmdb_success") {
                setToast({ msg: "Logado com sucesso", type: "success" });
                setIsLoggedIn(true);
            } else if (event.data === "tmdb_error") {
                setIsLoggedIn(true);
                setToast({
                    msg: "Não foi possível fazer o login",
                    type: "error",
                });
            }
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [setToast]);

    return (
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <NavLinks />
                    <div className="hidden md:flex items-center gap-4">
                        <Input hidden={false} />
                        {isLoggedin ? <UserDisplay /> : <ConectBtn />}
                    </div>
                    <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} />
                </div>
                <MobileMenuDropdown
                    setShowMenu={setShowMenu}
                    showMenu={showMenu}
                    navLinks={navLinks}
                    isLoggedin={isLoggedin}
                />
            </div>
        </header>
    );
}

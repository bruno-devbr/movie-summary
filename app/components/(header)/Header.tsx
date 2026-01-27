"use client";

import { useEffect, useState } from "react";
import { MobiledropDown } from "./(mobile)/MobileDropDown";
import { HeaderWrapper } from "./HeaderWrapper";
import { Logo } from "./Logo";
import { useUser } from "@/app/utils/hooks/store";
import Cookies from "js-cookie";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsLoggedIn } = useUser();

    useEffect(() => {
        function verifyIsLoggedIn() {
            const sessionID = Cookies.get("session_id");
            if (sessionID) setIsLoggedIn(true);
        }

        verifyIsLoggedIn();
    }, [setIsLoggedIn]);

    return (
        <header className="sticky top-0 bg-gray-900 border-b border-gray-800 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <HeaderWrapper
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>
                <MobiledropDown isOpen={isMobileMenuOpen} />
            </div>
        </header>
    );
}

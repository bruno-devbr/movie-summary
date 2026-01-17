"use client";

import { useEffect, useState } from "react";
import { MobiledropDown } from "./(mobile)/MobileDropDown";
import { HeaderWrapper } from "./HeaderWrapper";
import { Logo } from "./Logo";
import axios from "axios";
import { UserSchema } from "@/app/utils/types/User";
import { useUser } from "@/app/utils/hooks/store";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setUser, isLoggedIn } = useUser();

    useEffect(() => {
        async function loadUserData() {
            if (isLoggedIn) {
                const { data } = await axios.get("/api/user");
                const rawData = UserSchema.parse(data);

                setUser(rawData);
            }
        }

        loadUserData();
    }, [setUser, isLoggedIn]);

    return (
        <header className="sticky top-0 bg-gray-900 border-b border-gray-800">
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

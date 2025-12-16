"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu, MobileMenuDropdown } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { Input } from "./Search";
import { ConectBtn, UserBtn } from "./UserBtns";
import { navLinks } from "@/app/utils/dropDowns";

export function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <NavLinks />
                    <div className="hidden md:flex items-center gap-4">
                        <Input hidden={false} />
                        <ConectBtn />
                    </div>
                    <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} />
                </div>
                <MobileMenuDropdown
                    setShowMenu={setShowMenu}
                    showMenu={showMenu}
                    navLinks={navLinks}
                />
            </div>
        </header>
    );
}

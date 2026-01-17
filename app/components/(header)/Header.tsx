"use client";

import { useState } from "react";
import { MobiledropDown } from "./(mobile)/MobileDropDown";
import { HeaderWrapper } from "./HeaderWrapper";
import { Logo } from "./Logo";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

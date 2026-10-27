"use client";

import { HeaderWrapper } from "@components/layout/(header)/headerWrapper";
import { MobileDropdown } from "./mobile/MobileDropdown";

export function Header() {
    return (
        <header className="bg-gray-900 flex w-full justify-center border-b border-b-gray-800">
            <div className="container w-full px-4 flex flex-col">
                <HeaderWrapper />
                <MobileDropdown />
            </div>
        </header>
    );
}

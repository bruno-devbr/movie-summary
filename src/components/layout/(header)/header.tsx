"use client";

import { HeaderWrapper } from "@components/layout/(header)/headerWrapper";

export function Header() {
    return (
        <header className="bg-gray-900 flex w-full justify-center border-b border-b-gray-800">
            <div className="container w-full px-4 flex flex-col">
                <HeaderWrapper />
            </div>
        </header>
    );
}

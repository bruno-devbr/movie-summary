"use client";

import { SubLink } from "@/app/utils/types/dropDownTypes";
import { useState, useRef, useEffect } from "react";
import { navLinks } from "@/app/utils/dropDowns";
import Link from "next/link";

export function NavLinks() {
    const [showDropDown, setShowDropDown] = useState<number | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav ref={navRef} className="hidden md:flex items-center gap-6">
            {navLinks.map((prop, i) => (
                <div className="relative" key={i}>
                    <button
                        className="py-2 hover:text-blue-500 transition-colors cursor-pointer"
                        onClick={() => setShowDropDown(i)}
                    >
                        {prop.title}
                    </button>
                    {showDropDown === i && prop.arr && (
                        <DropDown arr={prop.arr} />
                    )}
                </div>
            ))}
        </nav>
    );
}

function DropDown({ arr }: { arr: SubLink[] }) {
    return (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            {arr.map((data, x) => (
                <Link
                    key={x}
                    href={data.link}
                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                    {data.title}
                </Link>
            ))}
        </div>
    );
}

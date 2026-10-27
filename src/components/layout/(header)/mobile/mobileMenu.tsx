"use client";

import { useMobileDropdownStore } from "@/store/dropdownStore";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
    const { isOpen, setOpen } = useMobileDropdownStore();

    return (
        <button
            type="button"
            onClick={() => setOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            className="flex p-2 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
        >
            {isOpen ? <X /> : <Menu />}
        </button>
    );
}

import { useEffect, useRef } from "react";
import { useDropdownStore } from "@/store/dropdownStore";
import { navItems } from "@/types/header/navbar";
import { DesktopDropdown } from "./desktopDropdown";

export function NavDesktop() {
    const { setDropdownId, dropdownId } = useDropdownStore();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setDropdownId(undefined);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [setDropdownId]);

    return (
        <div ref={navRef} className="hidden items-center gap-6 lg:inline-flex">
            {navItems.navItems.map((navItem) => (
                <div className="relative" key={navItem.id}>
                    <button
                        className="py-2 text-white text-xl transition-colors hover:text-blue-500"
                        onClick={() =>
                            setDropdownId(
                                dropdownId === navItem.id
                                    ? undefined
                                    : navItem.id,
                            )
                        }
                    >
                        {navItem.label}
                    </button>
                    <DesktopDropdown
                        dropdownItems={navItem.dropdownItems}
                        navId={navItem.id}
                    />
                </div>
            ))}
        </div>
    );
}

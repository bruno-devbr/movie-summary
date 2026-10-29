import { Fragment, useEffect, useRef } from "react";
import { useDropdownStore } from "@/store/dropdownStore";
import { navItems } from "@/types/header/navbar";
import { NavBtn } from "./navButton";
import { NavDropdownDesktop, NavDropdownMobile } from "./dropdown";

export function NavDesktop() {
    const { setDropdownId } = useDropdownStore();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                event.target instanceof Element &&
                event.target.closest("[data-mobile-dropdown]")
            ) {
                return;
            }

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
                    <NavBtn navItem={navItem} type="desktop" />
                    <NavDropdownDesktop
                        dropdownItems={navItem.dropdownItems}
                        navId={navItem.id}
                    />
                </div>
            ))}
        </div>
    );
}

export function NavMobile() {
    return (
        <div className="flex flex-col gap-2">
            {navItems.navItems.map((navItem) => (
                <Fragment key={navItem.id}>
                    <NavBtn navItem={navItem} type="mobile" />
                    <NavDropdownMobile
                        dropdownItems={navItem.dropdownItems}
                        navId={navItem.id}
                    />
                </Fragment>
            ))}
        </div>
    );
}

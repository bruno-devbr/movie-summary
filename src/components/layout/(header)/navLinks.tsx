import { DropdownItem } from "@/types/header/navbar";
import Link from "next/link";

interface NavLinksProps {
    type: "mobile" | "desktop";
    dropdownItems: DropdownItem[];
}

export function NavLinks({ dropdownItems, type }: NavLinksProps) {
    const classname =
        "flex py-2 px-4 items-center hover:bg-gray-700 transition-colors";

    const desktopClass = type === "desktop" ? "rounded-lg " : "";

    return (
        <>
            {dropdownItems.map((dropdownItem) => (
                <Link
                    href={dropdownItem.link}
                    key={dropdownItem.link}
                    className={desktopClass + classname}
                >
                    {dropdownItem.name}
                </Link>
            ))}
        </>
    );
}

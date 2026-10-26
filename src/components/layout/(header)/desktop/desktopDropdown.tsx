import { useDropdownStore } from "@/store/dropdownStore";
import { DropdownItem } from "@/types/header/navbar";
import Link from "next/link";

interface DesktopDropdownProps {
    dropdownItems: DropdownItem[];
    navId: string;
}

export function DesktopDropdown({
    dropdownItems,
    navId,
}: DesktopDropdownProps) {
    const { dropdownId } = useDropdownStore();
    const isOpen = dropdownId === navId;

    return (
        <div
            aria-hidden={!isOpen}
            className={`absolute top-15 left-0 flex w-54 flex-col gap-2.5 rounded-lg border border-gray-700 bg-gray-800 p-2.5 transition-all duration-200 ease-out ${
                isOpen
                    ? "visible scale-100 opacity-100"
                    : "invisible pointer-events-none scale-95 opacity-0"
            }`}
        >
            {dropdownItems.map((dropdownItem) => (
                <Link
                    href={dropdownItem.link}
                    key={dropdownItem.link}
                    tabIndex={isOpen ? 0 : -1}
                    className="flex items-center py-2 px-4 text-white transition-colors hover:bg-gray-700"
                >
                    {dropdownItem.name}
                </Link>
            ))}
        </div>
    );
}

import { useDropdownStore } from "@/store/dropdownStore";
import { DropdownProps } from "@/types/header/dropdown";
import Link from "next/link";

export function NavMobileDropdown({ dropdownItems, navId }: DropdownProps) {
    const { dropdownId } = useDropdownStore();
    const isOpen = dropdownId === navId;

    return (
        <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-200 ease-out ${
                isOpen
                    ? "grid-rows-[1fr] opacity-100 scale-100"
                    : "pointer-events-none grid-rows-[0fr] opacity-0 scale-95"
            }`}
        >
            <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-1 pt-1 pl-4">
                    {dropdownItems.map((dropdownItem) => (
                        <Link
                            className="flex py-2 px-4 items-center hover:bg-gray-700 transition-colors rounded-lg"
                            href={dropdownItem.link}
                            key={dropdownItem.link}
                        >
                            {dropdownItem.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

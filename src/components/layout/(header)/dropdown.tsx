import { useDropdownStore } from "@/store/dropdownStore";
import { DropdownProps } from "@/types/header/dropdown";
import { NavLinks } from "./navLinks";

export function NavDropdownDesktop({ dropdownItems, navId }: DropdownProps) {
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
            <NavLinks dropdownItems={dropdownItems} type="desktop" />
        </div>
    );
}

export function NavDropdownMobile({ dropdownItems, navId }: DropdownProps) {
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
                    <NavLinks dropdownItems={dropdownItems} type="mobile" />
                </div>
            </div>
        </div>
    );
}

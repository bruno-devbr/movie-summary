import { useDropdownStore } from "@/store/dropdownStore";
import { NavItemInterface } from "@/types/header/navbar";
import { ChevronDown } from "lucide-react";

interface NavBtnProps {
    type: "mobile" | "desktop";
    navItem: NavItemInterface;
}

export function NavBtn({ type, navItem }: NavBtnProps) {
    const { setDropdownId, dropdownId } = useDropdownStore();

    const handleClick = () => {
        setDropdownId(dropdownId === navItem.id ? undefined : navItem.id);
    };

    const classname =
        type === "desktop"
            ? "text-xl hover:text-blue-500"
            : "flex px-4 justify-between items-center rounded-lg hover:bg-gray-800";

    return (
        <button
            onClick={handleClick}
            className={"py-2 transition-colors " + classname}
        >
            {navItem.label}
            {type === "mobile" ? (
                <ChevronDown
                    className={`transition-transform duration-200 ease-in-out ${
                        dropdownId === navItem.id ? "rotate-180" : ""
                    }`}
                />
            ) : (
                ""
            )}
        </button>
    );
}

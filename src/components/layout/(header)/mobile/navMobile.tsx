import { useDropdownStore } from "@/store/dropdownStore";
import { navItems } from "@/types/header/navbar";
import { ChevronDown } from "lucide-react";

export function NavMobile() {
    const { dropdownId, setDropdownId } = useDropdownStore();

    return (
        <div className="flex flex-col gap-2">
            {navItems.navItems.map((navItem) => (
                <button
                    className="flex py-2 px-4 justify-between items-center rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => {
                        setDropdownId(
                            dropdownId === navItem.id ? undefined : navItem.id,
                        );
                    }}
                    key={navItem.id}
                >
                    {navItem.label}
                    <ChevronDown
                        className={`transition-transform duration-200 ease-in-out ${
                            dropdownId === navItem.id ? "rotate-180" : ""
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

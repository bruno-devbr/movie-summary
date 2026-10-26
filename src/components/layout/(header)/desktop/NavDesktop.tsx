import { useDropdownStore } from "@/store/dropdownStore";
import { navItems } from "@/types/header/navbar";

export function NavDesktop() {
    const { setDropdownId, dropdownId } = useDropdownStore();

    return (
        <div className="inline-flex gap-6 items-center">
            {navItems.navItems.map((navItem) => (
                <button
                    className="py-2 text-white text-xl transition-colors hover:text-blue-500"
                    onClick={() =>
                        setDropdownId(
                            dropdownId === navItem.id ? undefined : navItem.id,
                        )
                    }
                    key={navItem.id}
                >
                    {navItem.label}
                </button>
            ))}
        </div>
    );
}

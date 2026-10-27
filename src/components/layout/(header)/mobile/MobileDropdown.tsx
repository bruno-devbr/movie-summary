import { useMobileDropdownStore } from "@/store/dropdownStore";
import { Search } from "../search";
import { NavMobile } from "./navMobile";

export function MobileDropdown() {
    const { isOpen } = useMobileDropdownStore();

    if (isOpen)
        return (
            <div
                className="flex flex-col py-4 gap-2.5 border-t border-gray-700"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <Search />
                <NavMobile />
            </div>
        );
}

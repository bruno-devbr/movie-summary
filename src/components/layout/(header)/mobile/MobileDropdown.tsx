import { useMobileDropdownStore } from "@/store/dropdownStore";
import { Search } from "../search";
import { NavMobile } from "./navMobile";
import { ConnectBtn } from "../userBtns";

export function MobileDropdown() {
    const { isOpen } = useMobileDropdownStore();

    if (isOpen)
        return (
            <div
                data-mobile-dropdown
                className="flex flex-col py-4 gap-2.5 border-t border-gray-700 lg:hidden"
            >
                <Search />
                <NavMobile />
                <ConnectBtn />
            </div>
        );
}

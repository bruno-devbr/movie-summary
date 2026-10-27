import { useMobileDropdownStore } from "@/store/dropdownStore";
import { useUserStatus } from "@/store/status";
import { Search } from "../search";
import { NavMobile } from "./navMobile";
import { ConnectBtn, ErrorBtn, LoadingBtn } from "../userBtns";

export function MobileDropdown() {
    const { isOpen } = useMobileDropdownStore();
    const { isUserLoading, isUserError } = useUserStatus();

    if (isOpen)
        return (
            <div
                data-mobile-dropdown
                className="flex flex-col py-4 gap-2.5 border-t border-gray-700 lg:hidden"
            >
                <Search />
                <NavMobile />
                {isUserLoading ? (
                    <LoadingBtn />
                ) : isUserError ? (
                    <ErrorBtn />
                ) : (
                    <ConnectBtn />
                )}
            </div>
        );
}

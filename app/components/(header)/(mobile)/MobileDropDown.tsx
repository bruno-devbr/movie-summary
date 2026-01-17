import { SearchComponent } from "../Search";
import { NavMobile } from "./NavMobile";
import { UserArea } from "./UserArea";

interface MobiledropDownProps {
    isOpen: boolean;
}

export function MobiledropDown({ isOpen }: MobiledropDownProps) {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden border-t border-gray-800 py-4">
            <SearchComponent />
            <NavMobile />
            <div className="border-t border-gray-800 my-2"></div>
            <UserArea />
        </div>
    );
}

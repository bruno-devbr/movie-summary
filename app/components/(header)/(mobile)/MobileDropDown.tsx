import { SearchComponent } from "../Search";
import { UserArea } from "../UserArea";
import { NavMobile } from "./NavMobile";

interface MobiledropDownProps {
    isOpen: boolean;
    setIsMobileMenuOpen: (value: boolean) => void;
}

export function MobiledropDown({
    isOpen,
    setIsMobileMenuOpen,
}: MobiledropDownProps) {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden border-t border-gray-800 py-4">
            <SearchComponent />
            <NavMobile setIsOpen={setIsMobileMenuOpen} />
            <div className="border-t border-gray-800 my-2"></div>
            <UserArea setIsOpen={setIsMobileMenuOpen} />
        </div>
    );
}

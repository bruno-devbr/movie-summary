import { useDropDown } from "@/app/utils/hooks/store";
import { Menu, X } from "lucide-react";

export function MenuToggle() {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useDropDown();

    return (
        <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-700 transition-all"
        >
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
    );
}

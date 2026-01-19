import { Menu, X } from "lucide-react";

interface MenuToggleProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function MenuToggle({ open, setOpen }: MenuToggleProps) {
    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-700 transition-all"
        >
            {open ? <X /> : <Menu />}
        </button>
    );
}

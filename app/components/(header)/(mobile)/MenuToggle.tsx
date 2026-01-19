import { Menu, X } from "lucide-react";

interface MenuToggleProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function MenuToggle({ open, setOpen }: MenuToggleProps) {
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <button type="button" className="p-2 hover:bg-gray-700 transition-all">
            {open ? (
                <X onClick={handleClick} />
            ) : (
                <Menu onClick={handleClick} />
            )}
        </button>
    );
}

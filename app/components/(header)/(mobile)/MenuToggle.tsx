import { Menu, X } from "lucide-react";

interface MenuToogleProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function MenuToggle({ open, setOpen }: MenuToogleProps) {
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

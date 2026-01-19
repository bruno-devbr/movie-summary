import { UserBtn } from "./UserBtn";
import { UserDropDown } from "./UserDropDown";
import { useRef, useState, useEffect } from "react";

export function UserMenuDesktop() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative hidden lg:flex" ref={menuRef}>
            <UserBtn onClick={() => setOpen((prev) => !prev)} />
            <UserDropDown open={open} setOpen={setOpen} />
        </div>
    );
}

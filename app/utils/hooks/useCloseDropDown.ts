import { useEffect, useRef } from "react";
import { useDropDown } from "./store";

export const useCloseDropdown = () => {
    const { setLinksDropDown, setUserDropDown } = useDropDown();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setLinksDropDown(null);
                setUserDropDown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setLinksDropDown, setUserDropDown]);

    return ref;
};

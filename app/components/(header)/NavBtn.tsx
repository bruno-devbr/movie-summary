import { useDropDown } from "@/app/utils/hooks/store";
import { DropDownProps } from "@/app/utils/types/NavTypes";
import Link from "next/link";
import { useRef, useEffect } from "react";

interface NavBtnProps {
    index: number;
    btnContent: string;
    dropDownContent: DropDownProps[];
}

export function NavBtn({ btnContent, dropDownContent, index }: NavBtnProps) {
    const { DesktopMenu, setDesktopMenu } = useDropDown();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setDesktopMenu(DesktopMenu !== index ? index : null);
    };

    useEffect(() => {
        if (DesktopMenu !== index) return;

        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDesktopMenu(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [index, DesktopMenu, setDesktopMenu]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={`transition-colors ${DesktopMenu === index ? "text-blue-600" : "hover:text-blue-600"}`}
                onClick={handleClick}
                type="button"
            >
                {btnContent}
            </button>

            <div
                className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transition-all duration-200
                ${
                    DesktopMenu === index
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
                {dropDownContent.map((c) => (
                    <Link
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                        onClick={() => {
                            setDesktopMenu(null);
                            window.scroll(0, 0);
                        }}
                        key={c.link}
                        href={c.link}
                    >
                        {c.content}
                    </Link>
                ))}
            </div>
        </div>
    );
}

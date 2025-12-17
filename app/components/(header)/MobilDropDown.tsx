import { ChevronDown } from "lucide-react";
import { DropDownProps } from "@/app/utils/types/dropDownTypes";
import { userDropDow } from "@/app/utils/dropDowns";
import { useState } from "react";
import Link from "next/link";
import { Input } from "./Search";
import { ConectBtn } from "./UserBtns";
import { MobileDropDown } from "./DropDowns";

export function MobileMenuDropdown({
    showMenu,
    setShowMenu,
    navLinks,
    isLoggedin,
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    navLinks: DropDownProps[];
    isLoggedin: boolean;
}) {
    const [dropDown, setDropDown] = useState<number | null>(null);

    return (
        <>
            {showMenu && (
                <div className="md:hidden border-t border-gray-800 py-4">
                    <Input />
                    <nav className="space-y-2">
                        {navLinks.map((data, i) => (
                            <div key={i}>
                                <button
                                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                                    onClick={() =>
                                        setDropDown(dropDown === i ? null : i)
                                    }
                                >
                                    <span>{data.title}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                            dropDown === i ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                {dropDown === i && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {data.arr.map((data, i) => (
                                            <Link
                                                key={i}
                                                href={data.link}
                                                className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                {data.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoggedin ? (
                            <MobileDropDown
                                props={userDropDow}
                                setShowMenu={setShowMenu}
                            />
                        ) : (
                            <ConectBtn />
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}

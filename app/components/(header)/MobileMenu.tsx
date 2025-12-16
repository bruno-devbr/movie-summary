import { ChevronDown, LogOut, Menu as MenuIcon, Search, X } from "lucide-react";
import { DropDownProps, SubLink } from "@/app/utils/types/dropDownTypes";
import { userDropDow } from "@/app/utils/dropDowns";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function MobileMenu({
    showMenu,
    setShowMenu,
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
}) {
    return (
        <>
            <div className="flex md:hidden items-center gap-2">
                <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                    alt="usuario_demo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                    unoptimized
                />

                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                >
                    {showMenu ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MenuIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
        </>
    );
}

export function MobileMenuDropdown({
    showMenu,
    setShowMenu,
    navLinks,
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    navLinks: DropDownProps[];
}) {
    const [dropDown, setDropDown] = useState<number | null>(null);

    return (
        <>
            {showMenu && (
                <div className="md:hidden border-t border-gray-800 py-4">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full px-4 py-2 pl-10 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
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

                        <UserDropDown
                            props={userDropDow}
                            setShowMenu={setShowMenu}
                        />
                    </nav>
                </div>
            )}
        </>
    );
}

function UserDropDown({
    props,
    setShowMenu,
}: {
    props: SubLink[];
    setShowMenu: (value: boolean) => void;
}) {
    const [dropDown, setDropDown] = useState(false);

    return (
        <>
            <div className="border-t border-gray-800 my-2"></div>
            <button
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
                <span>bruno-devbr</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        dropDown ? "rotate-180" : ""
                    }`}
                />
            </button>
            {dropDown && (
                <div className="ml-4 mt-1 space-y-1">
                    {props.map((data, i) => {
                        const Icon = data.icon;

                        return (
                            <Link
                                key={i}
                                href={data.link}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                            >
                                <Icon className="w-4 h-4" />
                                {data.title}
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-red-400"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </>
    );
}

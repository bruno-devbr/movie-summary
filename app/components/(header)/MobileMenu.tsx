import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";

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

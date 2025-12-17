import { useGlobalStore } from "@/app/utils/hooks/store";
import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";

export function MobileMenu({
    showMenu,
    setShowMenu,
    isLoggedin,
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    isLoggedin: boolean;
}) {
    const { user } = useGlobalStore();

    return (
        <>
            <div className="flex md:hidden items-center gap-2">
                {/* Avatar substituído por círculo roxo com inicial do usuário */}
                {isLoggedin && (
                    <>
                        {!user.avatar ? (
                            <div
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg select-none"
                                style={{ minWidth: 32, minHeight: 32 }}
                            >
                                {user.username ? (
                                    user.username.charAt(0).toUpperCase()
                                ) : (
                                    <span className="text-xl">?</span>
                                )}
                            </div>
                        ) : (
                            <Image
                                src={`https://www.gravatar.com/avatar/${user.avatar}`}
                                width={32}
                                height={32}
                                alt="user image"
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                    </>
                )}

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

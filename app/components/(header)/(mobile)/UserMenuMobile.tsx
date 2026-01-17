import { userContents } from "@/app/utils/(header)/userDropdownContents";
import { useUser } from "@/app/utils/hooks/store";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function UserMenuMobile() {
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
                {user?.username}
                <ChevronDown
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""} transform`}
                />
            </button>
            {open && (
                <div className="ml-4 mt-1 space-y-1">
                    {userContents.map((c, i) => {
                        const icon = c.icon;

                        return (
                            <Link
                                key={i}
                                href={c.link}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <icon.type className="w-4 h-4" />
                                {c.text}
                            </Link>
                        );
                    })}

                    <button className="text-red-400 flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

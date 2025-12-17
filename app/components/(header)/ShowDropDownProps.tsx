import { SubLink } from "@/app/utils/types/dropDownTypes";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function ShowDropDownProps({
    props,
    setShowMenu,
}: {
    props: SubLink[];
    setShowMenu: (value: boolean) => void;
}) {
    return (
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
    );
}

import { SubLink } from "@/app/utils/types/dropDownTypes";
import { ShowDropDownProps } from "./ShowDropDownProps";
import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { logout } from "@/app/utils/api/logout";

export function DropDown({
    prop,
    setShowDropDown,
}: {
    prop: SubLink[];
    setShowDropDown: (value: boolean) => void;
}) {
    const { setToast, setUser } = useGlobalStore();

    return (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            {prop.map((data) => {
                const Icon = data.icon;

                return (
                    <Link
                        key={data.link}
                        href={data.link}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                        <Icon className="w-4 h-4" />
                        {data.title}
                    </Link>
                );
            })}
            <button
                onClick={() => {
                    logout({ setToast, setUser });
                    setShowDropDown(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 transition-colors text-red-400 cursor-pointer"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </div>
    );
}

export function MobileDropDown({
    props,
    setShowMenu,
}: {
    props: SubLink[];
    setShowMenu: (value: boolean) => void;
}) {
    const { user } = useGlobalStore();

    const [dropDown, setDropDown] = useState(false);

    return (
        <>
            <div className="border-t border-gray-800 my-2"></div>
            <button
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
                <span>{user.username}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        dropDown ? "rotate-180" : ""
                    }`}
                />
            </button>
            {dropDown && (
                <ShowDropDownProps props={props} setShowMenu={setShowMenu} />
            )}
        </>
    );
}

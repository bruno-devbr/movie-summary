import { userContents } from "@/app/utils/header/userDropdownContents";
import { LogoutBtn } from "../LogoutBtn";
import Link from "next/link";

export function UserDropDown({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (value: boolean) => void;
}) {
    return (
        <div
            className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg border border-gray-700 transition-all duration-200
                ${
                    open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
        >
            {userContents.map((content) => {
                const Icon = content.icon;

                return (
                    <Link
                        key={content.link}
                        href={content.link}
                        onClick={() => setOpen(false)}
                        className="flex p-2 gap-2 items-center hover:bg-gray-700 transition-colors"
                    >
                        {Icon && <Icon className="w-5 h-5" />}
                        {content.text}
                    </Link>
                );
            })}

            <LogoutBtn
                className="flex p-2 gap-2 items-center hover:bg-gray-700 transition-colors text-red-400 w-full"
                setOpen={setOpen}
            />
        </div>
    );
}

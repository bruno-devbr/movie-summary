import { DropDownContentProps } from "@/app/utils/types/dropDown";
import { useCloseDropdown } from "@/app/utils/hooks/useCloseDropDown";
import Link from "next/link";
import { useDropDown } from "@/app/utils/hooks/store";

export function DropDown({
    dropDownContent,
}: {
    dropDownContent: DropDownContentProps[];
}) {
    const { setLinksDropDown } = useDropDown();
    const ref = useCloseDropdown();

    return (
        <div
            className={`flex flex-col w-48 absolute top-full left-0 bg-gray-800 border border-gray-700 rounded-lg`}
            ref={ref}
        >
            {dropDownContent.map((dropDown) => (
                <Link
                    href={dropDown.link}
                    key={dropDown.link}
                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setLinksDropDown(null)}
                >
                    {dropDown.content}
                </Link>
            ))}
        </div>
    );
}

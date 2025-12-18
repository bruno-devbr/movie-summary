import { ChevronDown } from "lucide-react";
import { DropDownProps } from "@/app/utils/types/dropDownTypes";
import { useState } from "react";
import Link from "next/link";

export function MobileNavAccordion({
    navLinks,
}: {
    navLinks: DropDownProps[];
}) {
    const [dropDown, setDropDown] = useState<number | null>(null);

    return (
        <>
            {navLinks.map((data, i) => (
                <div key={i}>
                    <button
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                        onClick={() => setDropDown(dropDown === i ? null : i)}
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
                            {data.arr.map((item, j) => (
                                <Link
                                    key={j}
                                    href={item.link}
                                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

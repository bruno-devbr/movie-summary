import { useState } from "react";
import { contents } from "@/app/utils/header/navContents";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface NavMobileProps {
    setIsOpen: (value: boolean) => void;
}

export function NavMobile({ setIsOpen }: NavMobileProps) {
    const [dropDown, setDropDown] = useState<number | null>(null);

    return (
        <div className="space-y-2">
            {contents.map((content, i) => (
                <div key={i}>
                    <button
                        type="button"
                        className="flex justify-between w-full hover:bg-gray-700 p-2 rounded-lg transition-colors"
                        onClick={() => setDropDown(dropDown === i ? null : i)}
                    >
                        <span>{content.btnContent}</span>
                        <ChevronDown
                            className={`transition-transform duration-200 ${dropDown === i ? "rotate-180" : ""} transform`}
                        />
                    </button>

                    {dropDown === i && (
                        <div className="ml-4 mt-1 space-y-1">
                            {content.dropDownContent.map((c) => (
                                <Link
                                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    href={c.link}
                                    key={c.link}
                                >
                                    {c.content}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

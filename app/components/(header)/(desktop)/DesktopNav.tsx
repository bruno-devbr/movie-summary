"use client";

import { contents } from "@/app/utils/(header)/navContents";
import { useState } from "react";
import { NavBtn } from "../NavBtn";

export function DesktopNav() {
    const [dropDown, setDropDown] = useState<number | undefined>(undefined);

    return (
        <div className="hidden lg:flex gap-2">
            {contents.map((content, i) => (
                <NavBtn
                    key={i}
                    index={i}
                    dropDown={dropDown}
                    setDropDown={setDropDown}
                    btnContent={content.btnContent}
                    dropDownContent={content.dropDownContent}
                />
            ))}
        </div>
    );
}

import { contents } from "@/app/utils/header/navContents";
import { NavBtn } from "../NavBtn";

export function DesktopNav() {
    return (
        <div className="hidden lg:flex gap-2">
            {contents.map((content, i) => (
                <NavBtn
                    key={i}
                    index={i}
                    btnContent={content.btnContent}
                    dropDownContent={content.dropDownContent}
                />
            ))}
        </div>
    );
}

import { dropDownContent } from "@/app/utils/dropDownContent";
import { DropDownWrapper } from "./DropDownWrapper";

export function HeaderNav() {
    return (
        <nav className="flex flex-col lg:gap-6 lg:flex-row">
            {dropDownContent.map((dropDown, i) => (
                <DropDownWrapper key={i} dropDown={dropDown} index={i} />
            ))}
        </nav>
    );
}

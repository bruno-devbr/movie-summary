import { DropDownProps } from "@/app/utils/types/dropDown";
import { NavBtn } from "./NavBtn";
import { DropDown } from "./DropDown";
import { useDropDown } from "@/app/utils/hooks/store";

export function DropDownWrapper({
    dropDown,
    index,
}: {
    dropDown: DropDownProps;
    index: number;
}) {
    const { linksDropDown } = useDropDown();
    return (
        <div className="relative">
            <NavBtn content={dropDown.content} index={index} />
            {linksDropDown === index && (
                <DropDown dropDownContent={dropDown.dropDownContent} />
            )}
        </div>
    );
}

import { useDropDown } from "@/app/utils/hooks/store";
import { useEffect } from "react";

export function NavBtn({ content, index }: { content: string; index: number }) {
    const { linksDropDown, setLinksDropDown } = useDropDown();

    const handleClick = () => {
        setLinksDropDown(linksDropDown === index ? null : index);
    };

    useEffect(() => {
        console.log(linksDropDown);
    }, [linksDropDown]);

    return (
        <button
            className="py-2 rounded-lg hover:text-blue-500 transition-colors"
            onMouseDown={handleClick}
            type="button"
        >
            {content}
        </button>
    );
}

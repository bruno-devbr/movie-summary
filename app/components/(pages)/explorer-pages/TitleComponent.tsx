import { FilterBtn } from "./filter-form/FilterBtn";

interface TitleProps {
    text: string;
    isFilterPage: boolean;
}

export function Title({ text, isFilterPage }: TitleProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl">{text}</h1>
            {isFilterPage && <FilterBtn />}
        </div>
    );
}

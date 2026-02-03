import { ApplyBtn } from "./ApplyBtn";
import { ClearBtn } from "./ClearBtn";

export function FormButtons() {
    return (
        <div className="flex gap-2 mt-8">
            <ApplyBtn />
            <ClearBtn />
        </div>
    );
}

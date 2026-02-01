import { MinRate } from "./MinRate";
import { SortBy } from "./SortBy";
import { Year } from "./Year";

export function TopWrapper() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SortBy />
            <MinRate />
            <Year />
        </div>
    );
}

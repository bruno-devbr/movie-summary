import { SortBy } from "./SortBy";

export function TopWrapper() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SortBy />
        </div>
    );
}

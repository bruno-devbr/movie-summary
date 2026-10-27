import { Search } from "../search";
import { ConnectBtn } from "../userBtns";

export function SearchUser() {
    return (
        <div className="flex items-center gap-4">
            <Search />
            <ConnectBtn />
        </div>
    );
}

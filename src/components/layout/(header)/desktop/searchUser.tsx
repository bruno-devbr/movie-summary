import { Search } from "../search";
import { ConnectBtn } from "../userBtns";

export function SearchUser() {
    return (
        <div className="hidden items-center gap-4 lg:flex">
            <Search />
            <ConnectBtn />
        </div>
    );
}

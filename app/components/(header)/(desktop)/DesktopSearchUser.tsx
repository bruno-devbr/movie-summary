import { SearchComponent } from "../Search";
import { UserArea } from "../UserArea";
import { UserMenuDesktop } from "./UserMenuDesktop";

export function SearchUser() {
    return (
        <div className="hidden lg:flex gap-4 items-center">
            <SearchComponent />
            <UserArea />
        </div>
    );
}

import { SearchComponent } from "../Search";
import { UserMenuDesktop } from "./UserMenuDesktop";

export function SearchUser() {
    return (
        <div className="hidden lg:flex gap-4 items-center">
            <SearchComponent />
            <UserMenuDesktop />
        </div>
    );
}

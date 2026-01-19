import { UserBtn } from "./UserBtn";
import { UserDropDown } from "./UserDropDown";

export function UserMenu() {
    return (
        <div className="relative" ref={menuRef}>
            <UserBtn />
            <UserDropDown />
        </div>
    );
}

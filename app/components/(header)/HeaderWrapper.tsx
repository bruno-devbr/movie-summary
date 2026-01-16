import { DesktopNav } from "./(desktop)/DesktopNav";
import { SearchUser } from "./(desktop)/DesktopSearchUser";

export function HeaderWrapper() {
    return (
        <>
            <DesktopNav />
            <SearchUser />
        </>
    );
}

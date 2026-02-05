import { DesktopNav } from "./(desktop)/DesktopNav";
import { SearchUser } from "./(desktop)/DesktopSearchUser";
import { MobileMenu } from "./(mobile)/MobileMenuBtn";

export function HeaderWrapper() {
    return (
        <>
            <DesktopNav />
            <SearchUser />
            <MobileMenu />
        </>
    );
}

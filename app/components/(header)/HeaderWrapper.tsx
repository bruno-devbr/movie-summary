import { DesktopNav } from "./(desktop)/DesktopNav";
import { SearchUser } from "./(desktop)/DesktopSearchUser";
import { MobileMenu } from "./(mobile)/MobileMenuBtn";

interface HeaderWrapperProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderWrapper({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: HeaderWrapperProps) {
    return (
        <>
            <DesktopNav />
            <SearchUser />
            <MobileMenu
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
        </>
    );
}

import { DesktopWrapper } from "./desktop/desktopWrapper";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile/mobileMenu";

export function HeaderWrapper() {
    return (
        <div className="flex h-16 justify-between items-center">
            <Logo />
            <DesktopWrapper />
            <MobileMenu />
        </div>
    );
}

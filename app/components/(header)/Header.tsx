import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <NavLinks />
                </div>
            </div>
        </header>
    );
}

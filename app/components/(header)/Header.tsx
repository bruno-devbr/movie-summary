import { Logo } from "./Logo";

export function Header() {
    return (
        <header className="sticky top-0 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                </div>
            </div>
        </header>
    );
}

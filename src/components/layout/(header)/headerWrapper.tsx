import { Logo } from "@components/layout/(header)/logo";

export function HeaderWrapper() {
    return (
        <div className="flex h-16 justify-between items-center">
            <Logo />
        </div>
    );
}

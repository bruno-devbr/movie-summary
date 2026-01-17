import Image from "next/image";
import { MenuToggle } from "./MenuToggle";
import { useUser } from "@/app/utils/hooks/store";

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileMenu({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: MobileMenuProps) {
    const { user, isLoggedIn } = useUser();

    return (
        <div className="lg:hidden flex gap-2 items-center">
            {isLoggedIn && user && (
                <Image
                    src={user?.avatar}
                    alt="Imagem do perfil do usuario"
                    width={32}
                    height={32}
                    unoptimized
                    className="rounded-full"
                />
            )}

            <MenuToggle open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />
        </div>
    );
}

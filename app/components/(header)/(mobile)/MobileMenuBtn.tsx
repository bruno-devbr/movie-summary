import Image from "next/image";
import { MenuToggle } from "./MenuToggle";

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileMenu({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: MobileMenuProps) {
    return (
        <div className="lg:hidden flex gap-2 items-center">
            <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                alt="Imagem do perfil do usuario"
                width={32}
                height={32}
                unoptimized
            />

            <MenuToggle open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />
        </div>
    );
}

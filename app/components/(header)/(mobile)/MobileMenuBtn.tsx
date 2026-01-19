import Image from "next/image";
import { MenuToggle } from "./MenuToggle";
import { useUser } from "@/app/utils/hooks/store";

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (value: boolean) => void;
}

export function MobileMenu({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: MobileMenuProps) {
    const { user } = useUser();

    return (
        <div className="lg:hidden flex gap-2 items-center">
            {user?.avatar && (
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

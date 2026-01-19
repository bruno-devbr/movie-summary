import { useUser } from "@/app/utils/hooks/store";
import Image from "next/image";

interface UserBtnProps {
    onClick?: () => void;
}

export function UserBtn({ onClick }: UserBtnProps) {
    const { user } = useUser();

    return (
        <button
            className="flex items-center gap-2"
            onClick={onClick}
            type="button"
        >
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

            {user?.username}
        </button>
    );
}

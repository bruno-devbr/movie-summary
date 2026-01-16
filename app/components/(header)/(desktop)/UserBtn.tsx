import Image from "next/image";

interface UserBtnProps {
    onClick?: () => void;
}

export function UserBtn({ onClick }: UserBtnProps) {
    return (
        <button
            className="flex items-center gap-2"
            onClick={onClick}
            type="button"
        >
            <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                alt="Imagem do perfil do usuario"
                width={32}
                height={32}
                unoptimized
            />
            bruno-devbr
        </button>
    );
}

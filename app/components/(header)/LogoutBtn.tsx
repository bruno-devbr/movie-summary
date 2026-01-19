import { useUser } from "@/app/utils/hooks/store";
import { handleLogout } from "@/app/utils/login";
import { LogOut } from "lucide-react";

type LogoutBtnProps = {
    setOpen: (value: boolean) => void;
    className?: string;
};

export function LogoutBtn({ setOpen, className }: LogoutBtnProps) {
    const { setUser, setIsLoggedIn } = useUser();

    return (
        <button
            type="button"
            className={className}
            onClick={() => {
                handleLogout({ setUser, setIsLoggedIn });
                setOpen(false);
            }}
        >
            <LogOut className="w-5 h-5" />
            Logout
        </button>
    );
}

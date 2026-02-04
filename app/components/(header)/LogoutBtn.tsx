import { useDropDown, useUser } from "@/app/utils/hooks/store";
import { handleLogout } from "@/app/utils/login/login";
import { LogOut } from "lucide-react";

export function LogoutBtn({ className }: { classname?: string }) {
    const { setIsMobileMenuOpen } = useDropDown();
    const { setUser, setIsLoggedIn } = useUser();

    return (
        <button
            type="button"
            className={className}
            onClick={() => {
                handleLogout({ setUser, setIsLoggedIn });
                setIsMobileMenuOpen(false);
            }}
        >
            <LogOut className="w-5 h-5" />
            Logout
        </button>
    );
}

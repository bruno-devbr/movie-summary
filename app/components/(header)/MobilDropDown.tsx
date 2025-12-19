import { Input } from "./Search";
import { UserError, UserLoading } from "./UserAcess";
import { MobileDropDown } from "./DropDowns";
import { ConectBtn } from "./UserBtns";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { getUserData } from "@/app/utils/api/getUserData";
import { userDropDow } from "@/app/utils/dropDowns";
import { MobileNavAccordion } from "./MobileNavAccordion";

export function MobileMenuDropdown({
    showMenu,
    setShowMenu,
    navLinks,
    isLoggedin,
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    navLinks: DropDownProps[];
    isLoggedin: boolean;
}) {
    const { setUser, user } = useGlobalStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            if (isLoggedin) {
                setLoading(true);
                setError(false);

                const data = await getUserData({ setError, setLoading });

                if (data) {
                    setUser(data);
                } else {
                    setUser(null);
                }

                setLoading(false);
            }
        }

        fetchUserData();
    }, [setUser, isLoggedin]);

    if (!showMenu) return null;

    return (
        <div className="lg:hidden border-t border-gray-800 py-4">
            <Input />
            <nav className="space-y-2">
                <MobileNavAccordion navLinks={navLinks} />
                {/* ÁREA DO USUÁRIO — prioridade clara */}
                {loading && <UserLoading />}

                {!loading && error && (
                    <UserError setError={setError} setLoading={setLoading} />
                )}

                {!loading && !error && isLoggedin && user && (
                    <MobileDropDown
                        props={userDropDow}
                        setShowMenu={setShowMenu}
                    />
                )}

                {!loading && !error && !isLoggedin && !user && (
                    <ConectBtn setShowMenu={setShowMenu} />
                )}
            </nav>
        </div>
    );
}

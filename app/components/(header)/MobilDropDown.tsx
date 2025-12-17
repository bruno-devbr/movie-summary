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
}: {
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    navLinks: DropDownProps[];
}) {
    const { setUser, user } = useGlobalStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
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

        fetchUserData();
    }, [setUser]);

    if (!showMenu) return null;

    return (
        <div className="md:hidden border-t border-gray-800 py-4">
            <Input />
            <nav className="space-y-2">
                <MobileNavAccordion navLinks={navLinks} />
                {/* ÁREA DO USUÁRIO — prioridade clara */}
                {loading && <UserLoading />}

                {!loading && error && (
                    <UserError setError={setError} setLoading={setLoading} />
                )}

                {!loading && !error && user && (
                    <MobileDropDown
                        props={userDropDow}
                        setShowMenu={setShowMenu}
                    />
                )}

                {!loading && !error && !user && <ConectBtn />}
            </nav>
        </div>
    );
}

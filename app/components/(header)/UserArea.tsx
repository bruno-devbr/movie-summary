import { useRef, useState } from "react";

import { useUser } from "@/app/utils/hooks/store";
import { Buttons } from "./Buttons";
import { UserMenus } from "./UserMenus";

export function UserArea() {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUser();

    const authSuccessRef = useRef(false);

    return (
        <>
            {isLoggedIn ? (
                <UserMenus />
            ) : (
                <Buttons
                    authSuccessRef={authSuccessRef}
                    loading={loading}
                    setIsLoggedIn={setIsLoggedIn}
                    setLoading={setLoading}
                />
            )}
        </>
    );
}

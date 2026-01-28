import { useRef, useState } from "react";

import { useUser } from "@/app/utils/hooks/store";
import { Buttons } from "./Buttons";
import { UserMenus } from "./UserMenus";

interface UserAreaProps {
    setIsOpen: (value: boolean) => void;
}

export function UserArea({ setIsOpen }: UserAreaProps) {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUser();

    const authSuccessRef = useRef(false);

    return (
        <>
            {isLoggedIn ? (
                <UserMenus setIsOpen={setIsOpen} />
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

import { startTMDBAuth } from "@/app/utils/login";
import { ConnectBtn, ConnectBtnLoad } from "./ConnectBtn";
import { RefObject } from "react";

interface ButtonProps {
    loading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    authSuccessRef: RefObject<boolean>;
}

export function Buttons({
    authSuccessRef,
    loading,
    setIsLoggedIn,
    setLoading,
}: ButtonProps) {
    return (
        <>
            {loading ? (
                <ConnectBtnLoad />
            ) : (
                <ConnectBtn
                    handleLogin={() =>
                        startTMDBAuth({
                            authSuccessRef,
                            setIsLoggedIn,
                            setLoading,
                        })
                    }
                />
            )}
        </>
    );
}

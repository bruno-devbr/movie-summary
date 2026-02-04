import { startTMDBAuth } from "@/app/utils/login/login";
import { ConnectBtn, ConnectBtnLoad } from "./ConnectBtn";
import { RefObject } from "react";
import { useUser } from "@/app/utils/hooks/store";

interface ButtonProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
    authSuccessRef: RefObject<boolean>;
}

export function Buttons({ authSuccessRef, loading, setLoading }: ButtonProps) {
    const { setIsLoggedIn } = useUser();

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

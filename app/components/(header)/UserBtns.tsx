import { startTmdbAuth } from "@/app/utils/api/startTmdbAuth";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UserBtn, UserError, UserLoading } from "./UserAcess";
import { getUserData } from "@/app/utils/api/getUserData";

export function ConectBtn() {
    const { setToast } = useGlobalStore();
    const [loading, setLoading] = useState(false);

    return (
        <button
            disabled={loading}
            onClick={() => startTmdbAuth({ setLoading, setToast })}
            className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                bg-blue-600
                ${
                    loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-blue-700 cursor-pointer"
                }
            `}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Conectando
                </>
            ) : (
                "Conectar com TMDB"
            )}
        </button>
    );
}

export function UserDisplay() {
    const { setUser, user } = useGlobalStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const user = await getUserData({ setError, setLoading });

            if (user) {
                setUser(user);
            }
        }

        fetchUserData();
    }, [setUser]);

    if (loading) return <UserLoading />;
    if (error) return <UserError setError={setError} setLoading={setLoading} />;
    if (user) return <UserBtn user={user} />;

    return null;
}

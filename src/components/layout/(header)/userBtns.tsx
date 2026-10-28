import { UserStatusinterface, useUserStatus } from "@/store/status";
import { GetTokenInterface } from "@/types/login/getTokes";
import axios from "axios";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";

async function fetchData(items: UserStatusinterface) {
    try {
        items.updateIsUserLoading(true);
        items.updateIsUserError(false);

        const { data } = await axios.get<GetTokenInterface>("/api/auth");
        return data;
    } catch {
        items.updateIsUserError(true);
        return undefined;
    } finally {
        items.updateIsUserLoading(false);
    }
}

function redirectToTmdb(requestToken: string) {
    const redirectTo = `${process.env.NEXT_PUBLIC_LOCATION?.replace(/\/$/, "")}/auth/callback`;

    window.location.assign(
        `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`,
    );
}

export function ConnectBtn() {
    const items = useUserStatus();

    const handleClick = async () => {
        const data = await fetchData(items);

        if (!data?.request_token) {
            items.updateIsUserError(true);

            return;
        }

        redirectToTmdb(data.request_token);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="flex px-4 py-2 justify-center items-center bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Conectar com TMDB
        </button>
    );
}

export function LoadingBtn() {
    return (
        <button
            type="button"
            aria-busy="true"
            className="flex cursor-not-allowed px-4 py-2 justify-center gap-1 items-center bg-blue-700 rounded-lg"
            disabled
        >
            <LoaderCircle className="animate-spin size-4" />
            <span>Carregando...</span>
        </button>
    );
}

export function ErrorBtn() {
    const items = useUserStatus();
    const [isHover, setIsHover] = useState(false);

    const handleHover = () => {
        setIsHover(true);
    };

    const handleClick = async () => {
        const data = await fetchData(items);

        if (!data?.request_token) {
            items.updateIsUserError(true);
            return;
        }

        redirectToTmdb(data.request_token);
    };

    const text = isHover ? "Tentar Novamente" : "Erro ao carregar dados";

    return (
        <button
            type="button"
            onMouseEnter={handleHover}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleClick}
            className="relative flex cursor-pointer items-center justify-center bg-red-500 rounded-lg px-4 py-2 gap-1 hover:bg-red-950"
            aria-label="Falha ao conectar com o TMDB. Passe o mouse para tentar novamente."
        >
            <TriangleAlert />
            <span className="">{text}</span>
        </button>
    );
}

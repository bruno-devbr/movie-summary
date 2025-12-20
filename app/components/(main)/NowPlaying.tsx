import { getNowPlaying } from "@/app/utils/api/getNowPlaying";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { useEffect, useState } from "react";
import { Carrosel } from "./(now_playing)/NowPlayingCarrosel";
import { Movies } from "@/app/utils/types/globalItens";
import { Link_Title } from "./LinkComponent";

export function NowPlaying() {
    const [data, setData] = useState<Movies | undefined>();

    const { setGlobalError, setGlobalLoading } = useGlobalStore();

    useEffect(() => {
        async function fetchData() {
            const dt = await getNowPlaying({
                setGlobalError,
                setGlobalLoading,
            });

            setData(dt);
        }

        fetchData();
    }, [setGlobalError, setGlobalLoading]);

    if (!data) return null;
    return (
        <section className="mb-12">
            <div className="container mx-auto px-4 mb-6">
                <Link_Title link="/filmes/em-cartaz" title="Em Cartaz Agora" />
            </div>
            <Carrosel movies={data} />
        </section>
    );
}

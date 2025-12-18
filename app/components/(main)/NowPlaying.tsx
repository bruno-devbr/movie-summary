import { getNowPlaying } from "@/app/utils/api/getNowPlaying";
import { useGlobalStore } from "@/app/utils/hooks/store";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carrosel } from "./(now_playing)/NowPlayingCarrosel";
import { Movie } from "@/app/utils/types/movies";

export function NowPlaying() {
    const [data, setData] = useState<Movie[] | null>(null);

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
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">Em Cartaz Agora</h2>
                    <Link
                        href="/filmes/em-cartaz"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        Ver todos <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <Carrosel movies={data} />
        </section>
    );
}

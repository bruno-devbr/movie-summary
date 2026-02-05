import { CarrosselTypes } from "@/app/utils/types/CarrosselTypes";
import { TitleSection } from "./TitleSection";
import { GlobalGrid } from "../Grid";
import { useGetData } from "@/app/utils/hooks/useGetData";

interface CarroselProps {
    content: CarrosselTypes;
}

export function Carrosel({ content }: CarroselProps) {
    const { data } = useGetData(content.apiRoute, {});

    if (!data) return null;
    return (
        <section className="mb-12">
            <div className="container mx-auto px-4">
                <TitleSection link={content.link} text={content.title} />
                <GlobalGrid movies={data.results} />
            </div>
        </section>
    );
}

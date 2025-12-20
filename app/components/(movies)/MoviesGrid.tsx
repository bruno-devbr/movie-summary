import { Movie } from "@/app/utils/types/globalItens";
import { MovieCard } from "../(main)/(popular)/MovieCard";

export function MoviesGrid({ movies }: { movies?: Movie[] }) {
    if (!movies || movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

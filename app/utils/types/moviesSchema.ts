import z from "zod";

export const MoviesListSchema = z.object({
    page: z.number(),
    results: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            vote_average: z.number().transform((num) => num.toFixed(1)),
            overview: z.string(),
            backdrop_path: z
                .string()
                .transform(
                    (str) => `https://image.tmdb.org/t/p/original${str}`,
                ),
            release_date: z
                .string()
                .transform((str) => new Date(str).getFullYear()),
            poster_path: z
                .string()
                .transform((str) => `https://image.tmdb.org/t/p/w500${str}`),
        }),
    ),
    total_pages: z.number(),
    total_results: z.number(),
});

export type MoviesList = z.infer<typeof MoviesListSchema>;
export type Movies = z.infer<typeof MoviesListSchema.shape.results>;
export type Movie = z.infer<typeof MoviesListSchema.shape.results.element>;

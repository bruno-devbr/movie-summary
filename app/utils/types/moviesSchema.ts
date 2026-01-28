import z from "zod";

export const MoviesListSchema = z
    .object({
        page: z.number(),
        results: z.array(
            z.object({
                id: z.number(),
                title: z.string(),
                vote_average: z.number().transform((num) => num.toFixed(1)),
                overview: z.string(),
                // Adicionado .nullable() antes do transform
                backdrop_path: z
                    .string()
                    .nullable()
                    .transform((str) =>
                        str
                            ? `https://image.tmdb.org/t/p/original${str}`
                            : null,
                    ),
                release_date: z
                    .string()
                    .transform((str) =>
                        str ? new Date(str).getFullYear() : "N/A",
                    ),
                // Adicionado .nullable() antes do transform
                poster_path: z
                    .string()
                    .nullable()
                    .transform((str) =>
                        str
                            ? `https://image.tmdb.org/t/p/w500${str}`
                            : "https://via.placeholder.com/500x750?text=No+Image",
                    ),
            }),
        ),
        total_pages: z.number(),
        total_results: z.number(),
    })
    .passthrough();

export type MoviesList = z.infer<typeof MoviesListSchema>;
export type Movies = z.infer<typeof MoviesListSchema.shape.results>;
export type Movie = z.infer<typeof MoviesListSchema.shape.results.element>;

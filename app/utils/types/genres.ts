import z from "zod";

export const GenresSchema = z.object({
    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        }),
    ),
});

export type GenresList = z.infer<typeof GenresSchema.shape.genres>;

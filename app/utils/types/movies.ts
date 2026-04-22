import z from "zod";

export const MovieRatingSchema = z.object({
    value: z.number(),
});

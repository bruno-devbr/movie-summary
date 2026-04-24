import z from "zod";

export const ItemRatingSchema = z.object({
    value: z.number(),
});

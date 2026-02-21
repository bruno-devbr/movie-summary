import z from "zod";

export const ItemsRatingBodySchema = z.object({
    value: z.number(),
});

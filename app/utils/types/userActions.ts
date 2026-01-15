import z from "zod";

export const UserActionsBodySchema = z.object({
    media_type: z.literal("movie"),
    media_id: z.number(),
    watchlist: z.boolean().optional(),
    favorites: z.boolean().optional(),
});

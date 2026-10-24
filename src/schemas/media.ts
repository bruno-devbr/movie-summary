import z from "zod";

export const MediaListRequestSchema = z.object({
    media_type: z.string(),
    media_id: z.number(),
    favorite: z.boolean().optional(),
    watchlist: z.boolean().optional(),
});

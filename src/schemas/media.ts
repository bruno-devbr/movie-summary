import z from "zod";

export const MediaListRequestSchema = z.object({
    media_type: z.string(),
    media_id: z.number(),
    favorite: z.boolean().optional(),
    watchlist: z.boolean().optional(),
});

export const MediaListSchema = z.object({
    name: z.string(),
    description: z.string(),
    language: z.literal("pt-BR"),
});

export const MediaListItemRequestSchema = z.object({
    media_id: z.number(),
});

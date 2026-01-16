import z from "zod";

export const ListBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    language: z.literal("pt-BR"),
});

export const ListBodyActionsSchema = z.object({
    media_id: z.number(),
});

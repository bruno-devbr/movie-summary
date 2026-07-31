import z from "zod";

export const MediaIdSchema = z.object({
    media_id: z.number()
})
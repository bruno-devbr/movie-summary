import z from "zod";

export const RawDataSchema = z.object({
    ok: z.boolean().optional(),
    success: z.boolean().optional(),
});

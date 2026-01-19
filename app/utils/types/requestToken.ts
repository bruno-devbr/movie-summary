import z from "zod";

export const RequestTokenSchema = z.object({
    expires_at: z.string(),
    request_token: z.string(),
    success: z.boolean(),
});
